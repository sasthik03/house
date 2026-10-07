import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname;

  // শুধুমাত্র /admin এবং /admin/* protect করবে
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");

  // Public routes
  if (!isAdminRoute) {
    return NextResponse.next();
  }

  const { isAuthenticated, sessionClaims } = await auth();

  // Authentication না থাকলে login page
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Clerk session claims থেকে role
  const role = sessionClaims?.role;

  // শুধুমাত্র admin allowed
  if (role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Admin allowed
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
