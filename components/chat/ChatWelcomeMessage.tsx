import { Hash } from 'lucide-react';
import React from 'react'

interface ChatWelcomeMessageProps {
    type: "channel" | "conversation";
    name: string;
}

const ChatWelcomeMessage = ({ type, name }: ChatWelcomeMessageProps) => {
    return (
        <div className='space-y-2 mb-4 px-4'>
            {type === "channel" && (
                <div className='h-[75px] w-[75px] flex items-center justify-center dark:bg-zinc-700 rounded-full bg-zinc-500'>
                    <Hash className='h-12 w-12 text-white' />
                </div>
            )}
            <p className='text-xl md:text-3xl font-bold'>
                {type === "channel" ? "Welcome to #" : ""}
            </p>
            <p className='dark:text-zinc-400 text-sm text-zinc-600'>
                {type === "channel" ? `This is the start of the #${name} channel` : `This is the start of your conversation with ${name}`}
            </p>
        </div>
    )
}

export default ChatWelcomeMessage