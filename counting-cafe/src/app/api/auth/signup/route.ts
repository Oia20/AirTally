// Erroring in this file when signing up, something to do with the prisma I suspect.


import bcrypt from "bcrypt";
import { prisma } from "../../../lib/prisma/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    if (!body?.email || !body?.password) {
      return Response.json(
        { error: "Email and password are required" }, 
        { status: 400 }
      );
    }

    const { email, password } = body;

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return Response.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return Response.json(
      { message: "User created successfully", user: { id: user.id, email: user.email } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
