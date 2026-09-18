import { NextRequest, NextResponse } from "next/server";
import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get("access_token");

  // Protect wishlist page
  if (pathname.startsWith("/wishlist") && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/wishlist"],
};
