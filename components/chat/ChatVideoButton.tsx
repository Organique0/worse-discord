"use client"

import queryString from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ActionToolkit } from "../action-toolkit";
import { Video, VideoOff } from "lucide-react";


export const ChatVideoButton = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const isVideo = searchParams?.get("video");
    const Icon = isVideo ? VideoOff : Video;
    const tooltipLabel = isVideo ? "End video call" : "Start video call";

    const onClick = () => {
        const url = queryString.stringifyUrl({
            url: pathname || "",
            query: {
                video: isVideo ? undefined : true,
            }
        }, { skipNull: true });
        router.push(url);
    };


    return (
        <ActionToolkit side="bottom" label={tooltipLabel}>
            <button onClick={onClick} className="hover:opacity-75 transition mr-4">
                <Icon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
            </button>
        </ActionToolkit>
    )
}