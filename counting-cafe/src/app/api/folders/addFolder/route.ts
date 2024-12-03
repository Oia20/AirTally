import { prisma } from "../../../lib/prisma/prisma";

export async function POST(req: Request) {
  const { title, userId, id } = await req.json();
  const folder = await prisma.folder.create({
    data: {
      title,
      userId: userId,
      id: id,
    },
  });
  return new Response(JSON.stringify(folder), { status: 201 });
}
