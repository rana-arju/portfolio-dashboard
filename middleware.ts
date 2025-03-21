import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = path === "/auth";

  // Get the token from cookies
  const token = request.cookies.get("token")?.value || "";

  // Redirect logic
  if (isPublicPath && token) {
    // If user is on login page but already has a token, redirect to dashboard
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublicPath && !token) {
    // If user is trying to access a protected route without a token, redirect to login
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
