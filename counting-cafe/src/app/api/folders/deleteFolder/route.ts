import { prisma } from "../../../lib/prisma/prisma";

export async function DELETE(req: Request) {
   const { folderId, userId } = await req.json();

   const folder = await prisma.folder.delete({
    where: {
      id: folderId,
      userId: userId,
    },
   });

   return new Response(JSON.stringify(folder), { status: 200 });
}
