import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/dbClient";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { ServerSidebar } from "@/components/server/serverSidebar";
import { env } from "process";

const ServerLayout = async ({ children, params }: { children: React.ReactNode, params: { serverId: string } }) => {
    const profile = await currentProfile();
    if (!profile) return redirectToSignIn({ returnBackUrl: env.SERVER_URL + '/sign-in' });


    const server = db.server.findUnique({
        where: {
            id: params.serverId,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    if (!server) {
        return redirect("/")
    }
    return (
        <div className="h-full">
            <div className="md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
                <ServerSidebar serverId={params.serverId} />
            </div>
            <main className="h-full md:pl-60">
                {children}
            </main>
        </div>
    );
}

export default ServerLayout;