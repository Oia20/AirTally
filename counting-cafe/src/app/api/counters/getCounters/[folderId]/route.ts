import { prisma } from "../../../../lib/prisma/prisma";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { folderId: string } }
) {
  const parameters = await params;
  const folderId = parameters.folderId;



  if (!folderId) return new Response('Folder ID is required', { status: 400 });

  const counters = await prisma.counters.findMany({
    where: { folderId: parseInt(folderId) },
  });

  return new Response(JSON.stringify(counters), { status: 200 });
}