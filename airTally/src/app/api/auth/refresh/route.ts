import { prisma } from "../../../lib/prisma/prisma";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { refreshToken } = await req.json();
  
  if (!refreshToken) {
    return new Response("Refresh token required", { status: 401 });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as { userId: string };
    
    // Verify refresh token exists in database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user || user.refreshToken !== refreshToken) {
      return new Response("Invalid refresh token", { status: 403 });
    }

    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return new Response(JSON.stringify({ accessToken }), { status: 200 });
  } catch (error) {
    return new Response(`Invalid refresh token: ${error}`, { status: 403 });
  }
}