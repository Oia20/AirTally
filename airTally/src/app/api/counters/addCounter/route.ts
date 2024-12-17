import { prisma } from "../../../lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { folderId, name, increment, initial } = await req.json();

    const counter = await prisma.counters.create({
      data: {
        name,
        increment,
        initial,
        folder: {
          connect: { id: folderId }
        }
      },
    });

    return NextResponse.json(counter);
  } catch (error) {
    return NextResponse.json(
      { error: `Invalid refresh token: ${error}` },
      { status: 500 }
    );
  }
} 