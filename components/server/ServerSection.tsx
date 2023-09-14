"use client"

import { ChannelType, Member, MemberRole, Profile, Server } from "@prisma/client";
import { ActionToolkit } from "../action-toolkit";
import { Plus, Settings } from "lucide-react";
import { useModal } from "@/hooks/useModalStore";

interface ServerSectionProps {
    label: string;
    role?: MemberRole;
    sectionType: "channels" | "members";
    channelType?: ChannelType;
    server?: Server & { members: (Member & { profile: Profile })[] };
}

export const ServerSection = ({ label, role, sectionType, channelType, server }: ServerSectionProps) => {
    const { onOpen } = useModal();
    return (
        <div className="flex items-center justify-between py-2">
            <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">{label}</p>
            {role !== MemberRole.GUEST && sectionType === "channels" && (
                <ActionToolkit label="Create channel" side="top">
                    <button onClick={() => onOpen("createChannel", { channelType })} className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300">
                        <Plus className="h-4 w-4" />
                    </button>
                </ActionToolkit>
            )}
            {role == MemberRole.ADMIN && sectionType === "members" && (
                <ActionToolkit label="Manage members" side="top">
                    <button onClick={() => onOpen("members", { server })} className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300">
                        <Settings className="h-4 w-4" />
                    </button>
                </ActionToolkit>
            )}
        </div>
    )
}