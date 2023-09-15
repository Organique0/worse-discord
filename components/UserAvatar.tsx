"use client";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

interface UserAvatarProps {
    className?: string;
    src?: string;
}

export const UserAvatar = ({ src, className }: UserAvatarProps) => {
    return (
        <Avatar className={cn("h-7 w-7 md:h-10 md:w-10 rounded-sm", className)}>
            <AvatarImage src={src} />
            <AvatarFallback>?</AvatarFallback>
        </Avatar>
    )
}
