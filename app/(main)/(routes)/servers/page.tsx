import { InitialModal } from "@/components/modals/InitialModal";
import { Button } from "@/components/ui/button";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/dbClient";

const ServerHomePage = async () => {

    const profile = await currentProfile();


    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile?.id
                }
            }
        }
    })

    return (

        servers.length == 0 && <InitialModal />

    );
}

export default ServerHomePage;