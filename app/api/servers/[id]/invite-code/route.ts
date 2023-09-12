import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/dbClient";
import { NextResponse } from "next/server";
import { v4 } from "uuid";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const profile = await currentProfile();
        if (!profile) return new NextResponse("unathorized", { status: 401 });
        if (!params.id) return new NextResponse("server id missing", { status: 400 });

        const server = await db.server.update({
            where: {
                id: params.id,
                profileId: profile.id,
            }, data: {
                inviteCode: v4(),
            }
        });

        return NextResponse.json(server);
    } catch (error) {
        console.error(error);
        return new NextResponse("internal error", { status: 500 })
    }
}