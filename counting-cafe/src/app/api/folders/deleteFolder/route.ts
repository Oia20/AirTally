import { prisma } from "../../../lib/prisma/prisma";

export async function DELETE(req: Request) {
   const { folderId, userId } = await req.json();

   // First delete all counters in the folder
   await prisma.counters.deleteMany({
     where: {
       folderId: folderId
     }
   });

   // Then delete the folder
   const folder = await prisma.folder.delete({
    where: {
      id: folderId,
      userId: userId,
    },
   });

   return new Response(JSON.stringify(folder), { status: 200 });
}
