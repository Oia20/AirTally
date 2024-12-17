import { prisma } from "../../../lib/prisma/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const folderId = searchParams.get('folderId');
    
    if (!folderId) {
      return new Response(JSON.stringify({ viewMode: 'card' }), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const folder = await prisma.folder.findUnique({ 
      where: { id: folderId },
      select: { viewMode: true }
    });

    return new Response(JSON.stringify({ viewMode: folder?.viewMode || 'card' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching view mode:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch view mode' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
