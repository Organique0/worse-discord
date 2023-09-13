import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/dbClient";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const profile = await currentProfile();
        if (!profile) return new NextResponse("authentication", { status: 401 });
        if (!params.id) return new NextResponse("serverId", { status: 401 });

        const server = await db.server.update({
            where: {
                id: params.id,
                profileId: {
                    not: profile.id
                },
                members: {
                    some: {
                        profileId: profile.id
                    }
                }
            },
            data: {
                members: {
                    deleteMany: {
                        profileId: profile.id
                    }
                }
            }
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log(error);
        return new NextResponse("internal error", { status: 500 });
    }
}