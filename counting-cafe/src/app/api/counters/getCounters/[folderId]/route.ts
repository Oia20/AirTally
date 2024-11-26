import { prisma } from "../../../../lib/prisma/prisma";
import { NextRequest } from "next/server";

type Context = {
  params: {
    folderId: string
  }
}

export async function GET(
  request: NextRequest,
  { params }: Context
) {
  const folderId = params.folderId;

  if (!folderId) return new Response('Folder ID is required', { status: 400 });

  const counters = await prisma.counters.findMany({
    where: { folderId: parseInt(folderId) },
  });

  return new Response(JSON.stringify(counters), { status: 200 });
}