import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import { db } from "@/lib/dbClient";
import { MemberRole } from "@prisma/client";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const profile = await currentProfile();
        if (!profile) return new NextResponse("unauthorized", { status: 401 });

        const { searchParams } = new URL(req.url);
        const serverId = searchParams.get("serverId");

        if (!serverId) return new NextResponse("status id missing", { status: 400 });
        if (!params.id) return new NextResponse("channel id missing", { status: 400 });

        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data: {
                channels: {
                    delete: {
                        id: params.id,
                        name: {
                            not: "general",
                        }
                    }
                }
            }
        });

        return NextResponse.json(server);
    } catch (error) {
        console.error(error);
        return new NextResponse("internal error", { status: 500 })
    }
}
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const profile = await currentProfile();
        if (!profile) return new NextResponse("unauthorized", { status: 401 });
        const { name, type } = await req.json();
        const { searchParams } = new URL(req.url);
        const serverId = searchParams.get("serverId");

        if (!serverId) return new NextResponse("status id missing", { status: 400 });
        if (!params.id) return new NextResponse("channel id missing", { status: 400 });
        if (name === "general") return new NextResponse("name cannot be general", { status: 400 });


        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data: {
                channels: {
                    update: {
                        where: {
                            id: params.id,
                            NOT: {
                                name: "general",
                            }
                        },
                        data: {
                            name, type
                        }
                    },

                }
            }
        });

        return NextResponse.json(server);
    } catch (error) {
        console.error(error);
        return new NextResponse("internal error", { status: 500 })
    }
}
