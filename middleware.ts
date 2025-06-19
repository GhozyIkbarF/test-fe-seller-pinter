import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  const pathname = request.nextUrl.pathname
  const listNotAuthPage = ["/login", "/register"]

  const isNotAuthPage = listNotAuthPage.some((page) => pathname.startsWith(page))

  if (!token && !isNotAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (pathname === "/admin"){
    return NextResponse.redirect(new URL("/admin/articles", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
}
