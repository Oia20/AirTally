import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma/prisma";

export async function POST(req: Request) {
    const { id } = await req.json();
    const folder = await prisma.folder.findUnique({ where: { id } });
    if (!folder) {
        return NextResponse.json({ error: "Folder not found" }, { status: 404 });
    }
    const updatedFolder = await prisma.folder.update({
        where: { id },
        data: { isOpen: !folder.isOpen }
    });
    return NextResponse.json(updatedFolder);
}
