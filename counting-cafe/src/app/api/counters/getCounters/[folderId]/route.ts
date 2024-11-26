import { prisma } from "../../../../lib/prisma/prisma";

export async function GET(
  req: Request,
  context: { params: { folderId: string } }
) {
  const params = await context.params;
  const folderId = params.folderId;

  if (!folderId) return new Response('Folder ID is required', { status: 400 });

  const counters = await prisma.counters.findMany({
    where: { folderId: parseInt(folderId) },
  });

  return new Response(JSON.stringify(counters), { status: 200 });
}