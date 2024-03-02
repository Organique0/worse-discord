import { db } from "@/lib/dbClient";
import { redirect } from "next/navigation";
import { initialProfile } from "@/lib/initial-profile";


const SetupPage = async () => {
    const profile = await initialProfile();

    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    //where profileId is equal to the current user id
                    profileId: profile.id
                }
            }
        }
    });

    if (server) {
        redirect(`/servers/${server.id}`);
    } else {
        redirect(`/servers/`);
    }


}

export default SetupPage;