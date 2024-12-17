import bcrypt from "bcrypt";
import { prisma } from "../../../lib/prisma/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    if (!body?.email || !body?.password) {
      console.log("Email and password are required");
      return Response.json(
        { error: "Email and password are required" }, 
        { status: 400 }
      );
    }
    console.log("Email and password are required 2 ");

    const { email, password } = body;
    console.log("Email and password are required3", email, password);
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { 
        email: email
      },
    });
    console.log("Checking if user already exists222");
    if (existingUser) {
      console.log("User already exists");
      return Response.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }
    console.log("User does not exist");

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    console.log("Creating user with data:", { email, password: hashedPassword });
    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    console.log("User created successfully");
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
