import { prisma } from "../../../../lib/prisma/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ userId: string }> }
) {
  const params = await context.params;
  const userId = params.userId;
  if (!userId) return new Response('User ID is required', { status: 400 });

  const folders = await prisma.folder.findMany({
    where: { userId: userId },
    include: { counters: true },
  });
  return new Response(JSON.stringify(folders), { status: 200 });
}
