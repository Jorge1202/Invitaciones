import { auth } from "@/auth";
import { NextResponse } from "next/server";

/**
 * Define routes that don't require authentication.
 */
const PUBLIC_ROUTES = [
  "/",
  "/studio/auth",
  "/command/auth",
];

const PUBLIC_PREFIXES = [
  "/e/",             // Public invitations
  "/api/webhooks",   // External webhooks
  "/api/auth",       // NextAuth API routes
];

const isPublicRoute = (pathname: string) => {
  return (
    PUBLIC_ROUTES.includes(pathname) ||
    PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  );
};

export default auth((req) => {
  const { nextUrl } = req;
  const session = req.auth;
  const isLoggedIn = !!session;
  const pathname = nextUrl.pathname;

  // 1. Allow public routes
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // 2. Security: Force login for ALL other routes
  if (!isLoggedIn) {
    const callbackUrl = encodeURIComponent(pathname + nextUrl.search);
    const authPath = pathname.startsWith("/command") ? "/command/auth" : "/studio/auth";
    return NextResponse.redirect(new URL(`${authPath}?callbackUrl=${callbackUrl}`, nextUrl));
  }

  // 3. Role-Based Access Control (RBAC)
  const role = session.user?.role;

  // Protect /command (Super Admin only)
  if (pathname.startsWith("/command")) {
    if (role !== "super_admin") {
      // If a Revendedor tries to enter /command, send them back to /studio
      return NextResponse.redirect(new URL("/studio", nextUrl));
    }
  }

  // Protect /studio (Tenant Admin only — Super Admin belongs in /command)
  if (pathname.startsWith("/studio")) {
    if (role === "super_admin") {
      return NextResponse.redirect(new URL("/command", nextUrl));
    }
    if (role !== "tenant_admin") {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Public assets (images, fonts, etc)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ttf|woff2?|css|js)).*)",
  ],
};
