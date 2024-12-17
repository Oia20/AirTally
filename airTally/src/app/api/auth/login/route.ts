import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../../lib/prisma/prisma";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = await prisma.user.findUnique({
    where: { email },
    // Explicitly select the password field
    select: {
      id: true,
      password: true,
      email: true,
    },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return new Response("Invalid credentials", { status: 401 });
  }

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  const token = jwt.sign(
    { userId: user.id }, 
    process.env.JWT_SECRET!,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { userId: user.id }, 
    process.env.REFRESH_TOKEN_SECRET!, 
    { expiresIn: "7d" }
  );

  // Store refresh token in database
  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: refreshToken },
  });

  return new Response(
    JSON.stringify({ 
      token, 
      refreshToken,
      id: user.id 
    }), 
    { status: 200 }
  );
}