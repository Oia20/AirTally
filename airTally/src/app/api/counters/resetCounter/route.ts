import { NextResponse } from 'next/server';
import { prisma } from "../../../lib/prisma/prisma";


export async function POST(request: Request) {
  const { id } = await request.json();
  console.log(id);
  const counter = await prisma.counters.findUnique({
    where: { id: id },
  });
  if (!counter) return new Response('Counter not found', { status: 404 });
  
  const updatedCounter = await prisma.counters.update({
    where: { id: id },
    data: { count: 0 },
  });
  return NextResponse.json({ message: 'Counter reset' });
}