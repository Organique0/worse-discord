"use client"

import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { useParams, useRouter } from "next/navigation";

interface ServerSearchProps {
    data: {
        label: string;
        type: "channel" | "member";
        data: {
            icon: React.ReactNode;
            name: string;
            id: string;
        }[] | undefined;
    }[]
}


export const ServerSearch = ({ data }: ServerSearchProps) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const params = useParams();

    //Listen to ctrl+k keyboard command and open the search dialog
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        }
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [])

    const onClick = ({ id, type }: { id: string, type: "channel" | "member" }) => {
        setOpen(false);

        if (type === "member") return router.push(`/servers/${params?.serverId}/conversations/${id}`);

        if (type === "channel") return router.push(`/servers/${params?.serverId}/channels/${id}`);
    }

    return (
        <>
            <Button onClick={() => setOpen(true)} className="
            group 
            py-2 
            px-2 
            rounded-md 
            flex 
            items-center 
            gap-x-2 
            w-full 
            bg-zinc-700/10 
            dark:bg-zinc-700/90 
            hover:bg-zinc-300
            transition
            ">
                <Search className="text-zinc-500 dark:text-zinc-400 w-4 h-4 group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition" />
                <p className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition">
                    search
                </p>
                <kbd className="
                pointer-events-none 
                inline-flex 
                h-5 
                select-none 
                items-center 
                rounded 
                border 
                bg-muted p
                x-1.5 
                font-mono 
                text-[10px] 
                font-medium 
                text-muted-foreground
                ml-auto"
                >
                    <span className="text-xs">ctrl</span>K
                </kbd>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Search all channels and members" />
                <CommandList>
                    <CommandEmpty>
                        no results found
                    </CommandEmpty>
                    {data.map(({ label, type, data }) => {
                        if (!data?.length) return null;

                        return (
                            <CommandGroup key={label} heading={label}>
                                {data?.map(({ id, icon, name }) => {
                                    return (
                                        <CommandItem key={id} onSelect={() => onClick({ id, type })}>
                                            {icon}
                                            <span>{name}</span>
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        )
                    })}
                </CommandList>
            </CommandDialog>
        </>
    )
}