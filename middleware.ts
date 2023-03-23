// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  let cookie = request.cookies.get("access-token")?.value;
  if (cookie === undefined) {
    console.log("middleware ran to check cookie: ", cookie);
    request.cookies.delete("access-token");
    request.cookies.clear();

    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// matcher to run this middleware on every page EXCEPT the ones listed below (negative lookahead)
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|login).*)",
};
