import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Function to match protected routes
const isProtectedRoute = (path: string) => {
  const protectedRoutes = [
    /^\/admin(\/.*)?$/,
    /^\/CreateEvent(\/.*)?$/,
    /^\/Profile(\/.*)?$/,
    /^\/file-preview(\/.*)?$/,
    /^\/file(\/.*)?$/,
    /^\/upgrade$/,
  ];

  return protectedRoutes.some((route) => route.test(path));
};

export default clerkMiddleware((auth, req) => {
  // Check if the route is protected
  if (isProtectedRoute(req.nextUrl.pathname)) {
    // If the user is not authenticated, redirect to sign-in page
    //@ts-ignore
    if (!auth.userId) {
      const signInUrl = new URL('/auth/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.nextUrl.pathname); // Add the original path to redirect after login

      return NextResponse.redirect(signInUrl);
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
