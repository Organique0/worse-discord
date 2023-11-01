"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/useModalStore";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCcw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";

export const InviteModal = () => {
    const { isOpen, onClose, type, data, onOpen } = useModal();
    const [copied, setCopied] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const { server } = data;
    const origin = useOrigin();
    const inviteUrl = `${origin}/invite/${server?.inviteCode}`

    const isModalOpen = isOpen && type === "invite";

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    }

    const onNew = async () => {
        try {
            setLoading(true);
            const response = await axios.patch(`/api/servers/${server?.id}/invite-code`);
            onOpen("invite", { server: response.data });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden dark:bg-[#1E1F22] dark:text-zinc-200">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="font-bold text-center text-2xl">Invite somebody</DialogTitle>
                </DialogHeader>
                <div className="p-6">
                    <Label className="uppercase text-xs font-bold text-black dark:text-secondary/70 dark:text-zinc-200">
                        Server invite link
                    </Label>
                    <div className="flex items-center mt-2 gap-x-2">
                        <Input className="bg-zinc-300/50 focus-visible:ring-0 text-black focus-visible:ring-offset-0 border-0 dark:bg-zinc-300" value={inviteUrl} disabled={isLoading} autoFocus={false} />
                        <Button size="icon" onClick={onCopy} className="dark:bg-zinc-300" disabled={isLoading}>
                            {copied ? <Check className="text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        </Button>
                    </div>
                    <Button variant="link" size="sm" className="text-xs text-zinc-500 mt-4 dark:text-zinc-200" disabled={isLoading} onClick={onNew}>
                        Generate a new link
                        <RefreshCcw className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}