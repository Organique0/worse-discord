import { NextApiRequest, NextApiResponse } from "next";
import { NextApiResponseServerIo } from "../io";
import { currentProfilePages } from "@/lib/current-profile-pages";
import { db } from "@/lib/dbClient";

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIo) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "not allowed" });
    }

    try {
        const profile = await currentProfilePages(req);
        const { content, fileUrl } = req.body;
        const { serverId, channelId } = req.query;

        if (!profile) {
            return res.status(404).json({ error: "not authenticated" });
        }
        if (!serverId) {
            return res.status(404).json({ error: "server id  not provided" });
        }
        if (!channelId) {
            return res.status(404).json({ error: "channel id not provided" });
        }
        if (!content) {
            return res.status(404).json({ error: "content not provided" });
        }

        const server = await db.server.findFirst({
            where: {
                id: serverId as string,
                members: {
                    some: {
                        profileId: profile.id
                    }
                }
            },
            include: {
                members: true,
            }
        });
        if (!server) {
            return res.status(404).json({ error: "server not found" });
        }

        const channel = await db.channel.findFirst({
            where: {
                id: channelId as string,
                serverId: serverId as string
            }
        });

        if (!channel) {
            return res.status(404).json({ error: "server not found" });
        }

        const member = server.members.find(member => member.profileId === profile.id);
        if (!member) return res.status(404).json({ error: "member not found" });

        const message = await db.message.create({
            data: {
                content,
                fileUrl,
                channelId: channelId as string,
                memberId: member.id
            },
            include: {
                member: {
                    include: {
                        profile: true,
                    }
                }
            }
        });

        const channelKey = `chat:${channelId}:messages`;

        res?.socket?.server?.io?.emit(channelKey, message);

        return res.status(200).json(message);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal error" });
    }
}