"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Basic NProgress configuration
    NProgress.configure({ 
      showSpinner: false,
      speed: 400,
      minimum: 0.2
    });
  }, []);

  useEffect(() => {
    // Finish progress when the route changes
    NProgress.done();
    
    // We start the progress when we detect a link click through a global event
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest("a");
      
      if (anchor && anchor.href && !anchor.target && !anchor.href.includes("#")) {
        const url = new URL(anchor.href);
        if (url.origin === window.location.origin && url.pathname !== pathname) {
          NProgress.start();
        }
      }
    };

    window.addEventListener("click", handleAnchorClick);
    return () => window.removeEventListener("click", handleAnchorClick);
  }, [pathname, searchParams]);

  return null;
}
