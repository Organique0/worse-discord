"use client"

import { useSocket } from "@/providers/SocketProvider";
import { Badge } from "./ui/badge";


export const SocketIndicator = () => {
    const { isConnected } = useSocket();

    if (!isConnected) {
        return (
            <Badge className="bg-yellow-600 text-white border-none">
                Polling
            </Badge>
        )
    }

    return (
        <Badge variant="outline" className="bg-emerald-600 text-white border-none">
            Live
        </Badge>
    )
}