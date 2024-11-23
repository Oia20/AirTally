import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export default function middleware(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string };
    // Add userId to request headers
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('X-User-Id', decoded.userId);

    return NextResponse.next({
      headers: requestHeaders,
    });
  } catch (error) {
    return new NextResponse("Invalid or expired token", { status: 403 });
  }
}

export const config = {
  // Make sure to add routes we want to protect here.
  matcher: ["/api/protected/:path*"], // Adjust paths as needed
};