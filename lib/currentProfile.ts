import { db } from "@/lib/dbClient";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const currentProfile = async () => {
    //create a supabase client
    const supabase = createServerComponentClient({ cookies });
    //get data of the current user
    const currentUser = await supabase.auth.getUser();

    if (!currentUser.data.user) return null;

    const profile = await db.profile.findUnique({
        where: {
            userId: currentUser.data.user?.id
        }
    });

    return profile;
}