import { prisma } from "../../../lib/prisma/prisma";

export async function POST(req: Request) {
  const { id } = await req.json();
  const counter = await prisma.counters.delete({
    where: { id: id },
  });

  return new Response(JSON.stringify(counter), { status: 200 });
}