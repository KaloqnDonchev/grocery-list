import { NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  if (!request.cookies.get("session_id")) {
    response.cookies.set("session_id", uuidv4(), {
      maxAge: 60 * 60 * 24 * 365,
      httpOnly: true,
    })
  }

  return response
}