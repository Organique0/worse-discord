import AuthButton from "@/components/AuthButton";
import { db } from "@/lib/dbClient";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

const SetupPage = async () => {
    //from the code in the url create a supabase client
    const supabase = createServerComponentClient({ cookies });
    //get data of the current user
    const currentUser = await supabase.auth.getUser();


    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    //where profileId is equal to the current user id
                    profileId: currentUser.data.user?.id,
                }
            }
        }
    });

    if (server) {
        return redirect(`/servers/${server.id}`);
    }

    return (
        <div>
            create a server
            <AuthButton />
        </div>
    );
}

export default SetupPage;