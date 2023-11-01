import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/dbClient";
import { auth, useSession, useUser } from "@clerk/nextjs";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 } from "uuid";
export async function POST(req: Request) {
    try {
        const { name, imageUrl } = await req.json();
        const profile = await currentProfile();
        if (!profile) return new NextResponse("unauthorized", { status: 401 })

        const server = await db.server.create({
            data: {
                profileId: profile.id,
                name,
                imageUrl,
                inviteCode: v4(),
                channels: {
                    create: [
                        { name: "general", profileId: profile.id }
                    ]
                },
                members: {
                    create: [
                        { profileId: profile.id, role: MemberRole.ADMIN }
                    ]
                }
            }
        });

        return NextResponse.json(server);
    } catch (error) {
        console.error("server post error", error);
        return new NextResponse("internal error", { status: 500 });
    }
}