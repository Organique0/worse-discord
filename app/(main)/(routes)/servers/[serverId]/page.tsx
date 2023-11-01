import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/dbClient";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ServerPage = async ({ params }: { params: { serverId: string } }) => {
    const { serverId } = params;
    const profile = await currentProfile();
    if (!profile) return redirectToSignIn();

    const server = await db.server.findUnique({
        where: {
            id: serverId,
            members: {
                some: {
                    profileId: profile.id,
                }
            }
        },
        include: {
            channels: {
                where: {
                    name: "general",
                },
                orderBy: {
                    createdAt: "desc",
                }
            }
        }
    });

    const initialChannel = server?.channels[0];
    if (initialChannel?.name !== "general") return null;

    return redirect(`/servers/${serverId}/channels/${initialChannel.id}`);
}

export default ServerPage;