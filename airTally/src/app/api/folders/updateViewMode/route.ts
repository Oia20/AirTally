import { prisma } from "../../../lib/prisma/prisma";

export async function POST(req: Request) {
  try {
    const { viewMode, folderId } = await req.json();
    
    await prisma.folder.update({
      where: { id: folderId },
      data: { viewMode }
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error updating view mode:', error);
    return new Response(JSON.stringify({ error: 'Failed to update view mode' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
