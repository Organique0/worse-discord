"use client"

import { cn } from "@/lib/utils";
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client"
import { Edit, Hash, Mic, Video, Trash, Lock } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ActionToolkit } from "../action-toolkit";

interface ServerChannelProps {
    channel: Channel;
    server: Server;
    role?: MemberRole;
}

const iconMap = {
    [ChannelType.TEXT]: Hash,
    [ChannelType.AUDIO]: Mic,
    [ChannelType.VIDEO]: Video,
}

const ServerChannel = ({ channel, server, role }: ServerChannelProps) => {
    const params = useParams();
    const router = useRouter();

    const Icon = iconMap[channel.type];
    return (
        <button onClick={() => { }} className={cn(`
        group 
        px-2 
        py-2 
        rounded-md 
        flex 
        items-center 
        gap-x-2
        hover:bg-zinc-300
        dark:bg-[#2B2D31] 
        dark:hover:bg-zinc-700/90 
        transition
        mb-1
        w-full
         `, params?.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700"

        )}>
            <Icon className="flex-shrink-0 w-5 h-5 text-zinc-700 dark:text-zinc-200/50" />
            <p className={cn(`
            line-clamp-1 
            font-semibold 
            font-xs 
            text-zinc-500 
            group-hover:text-zinc-600 
            dark:text-zinc-400 
            dark:group-hover:text-zinc-300
            transition
            `,
                params?.channelId === channel.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white"
            )}>
                {channel.name}
            </p>
            {channel.name !== "general" && role !== MemberRole.GUEST && (
                <div className="ml-auto flex items-center gap-x-2">
                    <ActionToolkit label="Edit">
                        <Edit className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition" />
                    </ActionToolkit>
                    <ActionToolkit label="Delete">
                        <Trash className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition" />
                    </ActionToolkit>
                </div>
            )}
            {channel.name === "general" && (
                <Lock className="ml-auto text-zinc-500 dark:text-zinc-400 w-4 h-4" />
            )}
        </button>
    )
}

export default ServerChannel