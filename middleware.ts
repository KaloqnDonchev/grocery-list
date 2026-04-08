import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  if (!request.cookies.get("session_id")) {
    response.cookies.set("session_id", crypto.randomUUID(), {
      maxAge: 60 * 60 * 24 * 365,
      httpOnly: true,
    })
  }

  return response
}