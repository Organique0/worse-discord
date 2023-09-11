import AuthButton from "@/components/AuthButton";
import { InitialModal } from "@/components/modals/InitialModal";
import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/dbClient";
import { redirect, useRouter } from "next/navigation";

const SetupPage = async () => {
    const profile = await currentProfile();
    if (!profile) {
        return <AuthButton />
    }
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