"use client";

import { useEffect, useState } from 'react';
import '@livekit/components-styles';
import {
    LiveKitRoom,
    VideoConference,
} from '@livekit/components-react';
import { Channel } from '@prisma/client';
import { useUser } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';

interface MediaRoomProps {
    chatId: string;
    video: boolean;
    audio: boolean;
}

export const MediaRoom = ({ chatId, video, audio }: MediaRoomProps) => {
    const { user } = useUser();
    const [token, setToken] = useState("");

    useEffect(() => {
        if (!user?.firstName || !user?.lastName) return;

        const name = `${user.firstName} ${user.lastName}`;

        (async () => {
            try {
                const respose = await fetch(`/api/livekit?room=${chatId}&username=${name}`);
                const data = await respose.json();
                setToken(data.token);
            } catch (error) {
                console.log(error);
            }
        })()
    }, [chatId, user?.firstName, user?.lastName]);

    if (token === "") {
        return (
            <div className='flex flex-col flex-1 justify-center items-center'>
                <Loader2 className='h-9 w-9 text-zinc-500 animate-spin my-4' />
                <p className='text-zinc-500 dark:text-zinc-400 text-s'>
                    Loading...
                </p>
            </div>
        )
    }

    return (
        <LiveKitRoom
            data-lk-theme="default"
            video={true}
            audio={true}
            token={token}
            connect={true}
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        >
            <VideoConference />
        </LiveKitRoom>
    )
}