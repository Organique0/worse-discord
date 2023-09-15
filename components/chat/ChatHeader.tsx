import { Hash } from "lucide-react";

import MobileToggle from "@/components/MobileToggle";
interface ChatHeaderProps {
    serverId: string;
    name: string;
    type: "channel" | "convesation";
    imageUrl?: string;
}

export const ChatHeader = ({ serverId, name, type, imageUrl }: ChatHeaderProps) => {

    return (
        <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
            <MobileToggle serverId={serverId} />
            {type === "channel" && (
                <Hash className="text-zinc-500 dark:text-zinc-400 w-5 h-5 mr-2" />
            )}
            <p className="font-semibold text-md text-black dark:text-white">
                {name}
            </p>
        </div>
    )
}