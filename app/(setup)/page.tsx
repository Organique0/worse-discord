import AuthButton from "@/components/AuthButton";
import { InitialModal } from "@/components/modals/InitialModal";
import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/dbClient";
import { redirect } from "next/navigation";

const SetupPage = async () => {

    const profile = await currentProfile();

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
            <AuthButton />
            <InitialModal />
        </div>
    );
}

export default SetupPage;