import { db } from "@/lib/dbClient";
import { auth, useSession, useUser } from "@clerk/nextjs";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 } from "uuid";
export async function POST(req: Request) {
    try {
        const { name, imageUrl } = await req.json();
        const { userId } = auth();
        if (!userId) return new NextResponse("unauthenticated", { status: 401 });

        const server = await db.server.create({
            data: {
                profileId: userId,
                name,
                imageUrl,
                inviteCode: v4(),
                channels: {
                    create: [
                        { name: "general", profileId: userId }
                    ]
                },
                members: {
                    create: [
                        { profileId: userId, role: MemberRole.ADMIN }
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