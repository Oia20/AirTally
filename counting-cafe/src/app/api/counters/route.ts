import { prisma } from '@/app/lib/prisma/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  const counter = await prisma.cCCounters.create({
    data: {
      name: data.name,
      increment: data.incrementBy,
      initial: data.initialValue,
      folderId: data.folderId,
    },
  });
  return NextResponse.json(counter);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  await prisma.cCCounters.delete({
    where: {
      id: Number(id),
    },
  });
  return NextResponse.json({ success: true });
}