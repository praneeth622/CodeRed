// middleware.ts

import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Function to match protected routes
const isProtectedRoute = (path: string) => {
  const protectedRoutes = [
    /^\/admin(\/.*)?$/,   // Protecting all /admin routes
    /^\/dashboard(\/.*)?$/,  // Protecting all /dashboard routes
    /^\/profile(\/.*)?$/,  // Protecting profile routes
  ];

  return protectedRoutes.some((route) => route.test(path));
};
export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

// export default clerkMiddleware((auth, req) => {
  // // Check if the user is authenticated
  // if (isProtectedRoute(req.nextUrl.pathname)) {
  //   //@ts-ignore
  //   if (!auth.userId) {
  //     const signInUrl = new URL('/auth/sign-in', req.url);
  //     signInUrl.searchParams.set('redirect_url', req.nextUrl.pathname); // Redirect after login
  //     return NextResponse.redirect(signInUrl);  // Redirect to sign-in if not authenticated
  //   }
  // }

  // Continue to the next middleware or route if user is authenticated
//   return NextResponse.next();
// });

export const config = {
  matcher: [
    // Match routes except for Next.js internals or static files
    '/((?!_next|[^?]*\\.(?:html?|css|js|jpe?g|png|gif|svg|ico)).*)',
  ],
};
