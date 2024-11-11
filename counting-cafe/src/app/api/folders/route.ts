import { prisma } from '@/app/lib/prisma/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const folders = await prisma.cCFolder.findMany({
    include: {
      counters: true,
    },
  });
  return NextResponse.json(folders);
}

export async function POST(request: Request) {
  const data = await request.json();
  const folder = await prisma.cCFolder.create({
    data: {
      title: data.title,
      userId: 1, // TODO: Replace with actual user ID from auth
    },
  });
  return NextResponse.json(folder);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  await prisma.cCFolder.delete({
    where: {
      id: Number(id),
    },
  });
  return NextResponse.json({ success: true });
}