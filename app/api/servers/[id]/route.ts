import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/dbClient";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const profile = await currentProfile();
        const { name, imageUrl } = await req.json();
        if (!profile) return new NextResponse("unauthorized", { status: 401 });

        const server = await db.server.update({
            where: {
                id: params.id,
                profileId: profile.id,
            }, data: {
                name,
                imageUrl
            }
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log(error);
        return new NextResponse("internal error", { status: 500 })
    }
}