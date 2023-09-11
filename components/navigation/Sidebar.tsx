import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/dbClient";
import { redirect } from "next/navigation";
import NavigationAction from "./NavigationAction";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { NavigationItem } from "./NavigationItem";
import { ModeToggle } from "../ModeToggle";
import AuthButton from "../AuthButton";

const Sidebar = async () => {
    const profile = await currentProfile();
    if (!profile) return redirect("/");

    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile?.userId
                }
            }
        }
    })
    return (
        <div className="flex flex-col items-center h-full space-y-4 text-primary w-full dark:bg-[#1E1F22]">
            <NavigationAction />
            <Separator className="h-[2px] bg-zinc-300 dark:bg-zick-700 mx-auto w-10 rounded-md" />
            <ScrollArea className="flex-1 w-full">
                {servers.map(server => (
                    <div key={server.id} className="mb-4">
                        <NavigationItem id={server.id} imageUrl={server.imageUrl} name={server.name} />
                    </div>
                ))}
            </ScrollArea>
            <div className="mt-auto flex items-center flex-col gap-y-4 pb-3">
                <ModeToggle />
                <AuthButton />
            </div>
        </div>
    );
}

export default Sidebar;