import { prisma } from "../../../lib/prisma/prisma";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  console.log("Received ID:", id);

  const isNumericId = !isNaN(Number(id));
  const counter = await prisma.counters.findUnique({
    where: { id: isNumericId ? Number(id) : undefined },
  });

  if (!counter) {
    console.log("Counter not found for ID:", id);
    return new Response(JSON.stringify({ error: 'Counter not found' }), { status: 404 });
  }

  console.log("Counter found:", counter);
  return new Response(JSON.stringify(counter), { status: 200 });
}

