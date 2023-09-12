"use client"

import { Member, MemberRole, Profile, Server } from "@prisma/client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from "lucide-react";
import { useModal } from "@/hooks/useModalStore";

interface serverHeaderProps {
    server: Server & { members: (Member & { profile: Profile })[] };
    role?: MemberRole;
}

export const ServerHeader = ({ server, role }: serverHeaderProps) => {
    const { onOpen } = useModal();
    const isAdmin = role === MemberRole.ADMIN;
    const isModerator = isAdmin || role === MemberRole.MODERATOR;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none" asChild>
                <Button className="dark:text-neutral-200 w-full text-md font-semibold px-3 h-12 bg-zinc-700 dark:border-neutral-800 border-b-2 focus-visible:ring-0 dark:bg-zinc-700/50 transition flex justify-between">
                    {server.name}
                    <ChevronDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 text-xs font-medium dark:text-neutral-400 space-y-[2px] text-black">
                {isModerator && <DropdownMenuItem onClick={() => onOpen("invite", { server })} className="text-indigo-600 dark:text-indigo-400 py-2 text-sm cursor-pointer px-3 focus:text-indigo-600">Invite people<UserPlus className="h-4 w-4 ml-auto" /></DropdownMenuItem>}
                {isAdmin && <DropdownMenuItem className="py-2 text-sm cursor-pointer px-3" onClick={() => onOpen("editServer", { server })}>Server settings<Settings className="h-4 w-4 ml-auto" /></DropdownMenuItem>}
                {isAdmin && <DropdownMenuItem className="py-2 text-sm cursor-pointer px-3">Manage members<Users className="h-4 w-4 ml-auto" /></DropdownMenuItem>}
                {isModerator && <DropdownMenuItem className="py-2 text-sm cursor-pointer px-3">Create channel<PlusCircle className="h-4 w-4 ml-auto" /></DropdownMenuItem>}
                {isModerator && <DropdownMenuSeparator />}
                {isAdmin && <DropdownMenuItem className="py-2 text-sm cursor-pointer px-3 text-rose-600 dark:text-rose-400 focus:text-rose-600">Delete server<Trash className="h-4 w-4 ml-auto" /></DropdownMenuItem>}
                {!isAdmin && <DropdownMenuItem className="py-2 text-sm cursor-pointer px-3 text-rose-600 dark:text-rose-400 focus:text-rose-600">Leave server<LogOut className="h-4 w-4 ml-auto" /></DropdownMenuItem>}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}