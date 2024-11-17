
import { prisma } from '@/app/lib/prisma/prisma'
import { NextResponse } from 'next/server'

export async function GET(): Promise<Response> {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  }