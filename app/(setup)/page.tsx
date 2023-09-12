import { InitialModal } from "@/components/modals/InitialModal";
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
                    profileId: profile?.userId
                }
            }
        }
    });

    if (server) {
        return redirect(`/servers/${server.id}`);
    }

    return (
        <div>
            <InitialModal />
        </div>
    );
}

export default SetupPage;