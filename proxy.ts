import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname;

  // /admin এবং /admin/* সব route
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");

  // অন্য route-এ কিছু করার দরকার নেই
  if (!isAdminRoute) {
    return;
  }

  const { isAuthenticated, sessionClaims } = await auth();

  // Login করা নেই
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Clerk Session Token থেকে role
  const role = sessionClaims?.role;

  // শুধুমাত্র admin allowed
  if (role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Admin হলে request continue করবে
});

export const config = {
  matcher: [
    /*
     * সব application route-এ Clerk চালাবে
     * কিন্তু Next static files বাদ দেবে।
     */
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",

    /*
     * API এবং tRPC-তেও Clerk middleware চলবে।
     */
    "/(api|trpc)(.*)",

    /*
     * Clerk frontend API
     */
    "/__clerk/(.*)",
  ],
};
