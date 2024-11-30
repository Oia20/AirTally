import { prisma } from "../../../../lib/prisma/prisma";

export async function GET(
  req: Request,
  context : { params: Promise<{ folderId: string }> }
) {
  const params = await context.params;
  const folderId = params.folderId;

  if (!folderId) return new Response('Folder ID is required', { status: 400 });

  const counters = await prisma.counters.findMany({
    where: { folderId: parseInt(folderId) },
  });

  console.log(counters);

  return new Response(JSON.stringify(counters), { status: 200 });
}