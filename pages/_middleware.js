import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  //token exist if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname } = req.nextUrl;
  //Allow the request if the following is true..
  // - request for next-auth session provider fetching
  // - token exists
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  //redirect to login if no token and is requesting protected route
  if (!token && pathname !== "/login") {
    return NextResponse.redirect("/login");
  }
}
