// middleware.ts
import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  const pathname = request.nextUrl.pathname

  const isAuthPage = pathname.startsWith("/auth")
  const isAdminPage = pathname.startsWith("/admin")

  // Belum login → redirect ke login
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]))
      const role = payload.role
      console.log("User role:", role)
      console.log("User payload:", payload)
      console.log("User token:", token);
      ;
      
      // User mencoba akses halaman admin
      // if (isAdminPage && role !== "admin") {
      //   return NextResponse.redirect(new URL("/unauthorized", request.url))
      // }

    } catch (e) {
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
}
