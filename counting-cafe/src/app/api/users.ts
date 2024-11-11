// app/api/users/route.ts
import { prisma } from '@/app/lib/prisma/prisma'
import { NextResponse } from 'next/server'

export async function GET(): Promise<Response> {
    const users = await prisma.cCUser.findMany();
    return NextResponse.json(users);
  }
  