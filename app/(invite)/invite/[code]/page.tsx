import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/dbClient";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { env } from "process";

interface InviteCodePageProps {
    params: {
        code: string;
    }
}

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
    const profile = await currentProfile();

    if (!profile) return redirectToSignIn({ returnBackUrl: env.SERVER_URL + '/sign-in' });

    if (!params.code) return redirect("/");

    const existingServer = await db.server.findFirst({
        where: {
            inviteCode: params.code,
            members: {
                some: {
                    profileId: profile.id,
                }
            }
        }
    });

    if (existingServer) return redirect(`/servers/${existingServer.id}`);

    const server = await db.server.update({
        where: {
            inviteCode: params.code,
        },
        data: {
            members: {
                create: [
                    {
                        profileId: profile.id
                    }
                ]
            }
        }
    });

    if (server) return redirect(`/servers/${server.id}`);

    return (
        <div></div>
    );
}

export default InviteCodePage;