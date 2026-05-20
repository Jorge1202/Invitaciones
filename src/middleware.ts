import { auth } from "@/auth";
import { NextResponse } from "next/server";

const isPublicRoute = (pathname: string) => {
  const publicPaths = [
    "/",
    "/studio/auth",
    "/command/auth",
    "/api/auth",
  ];
  return (
    publicPaths.some((path) => pathname === path || pathname.startsWith(path)) ||
    pathname.startsWith("/e/") ||
    pathname.startsWith("/api/webhooks")
  );
};

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const pathname = nextUrl.pathname;

  // 1. If public route, let it pass
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // 2. If not logged in and not public, redirect to sign-in
  if (!isLoggedIn) {
    let callbackUrl = pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    
    // Choose auth path based on where they were trying to go
    const authPath = pathname.startsWith("/command") ? "/command/auth" : "/studio/auth";
    
    return NextResponse.redirect(
      new URL(`${authPath}?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  // 3. Role-based routing (Guardian logic)
  const role = req.auth?.user?.role;

  // Super Admin logic
  if (pathname.startsWith("/command") && role !== "super_admin") {
    return NextResponse.redirect(new URL("/studio", nextUrl));
  }

  // Tenant Admin logic
  if (pathname.startsWith("/studio") && role === "super_admin") {
    // Super Admin can visit Studio (Impersonation or internal view)
    return NextResponse.next();
  }

  // Add more logic for other roles as needed...

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
