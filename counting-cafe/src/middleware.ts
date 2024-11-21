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
    jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.next();
  } catch (error) {
    return new NextResponse("Invalid or expired token", { status: 403 });
  }
}

export const config = {
  // Make sure to add routes we want to protect here.
  matcher: ["/api/protected/:path*"], // Adjust paths as needed
};