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
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import qs from "query-string";

export const DeleteMessageModal = () => {
    const { isOpen, onClose, type, data, onOpen } = useModal();
    const [isLoading, setLoading] = useState(false);
    const { apiUrl, query } = data;
    const isModalOpen = isOpen && type === "deleteMessage";


    const onClick = async () => {
        try {
            setLoading(true);
            const url = qs.stringifyUrl({
                url: apiUrl || "",
                query
            });
            await axios.delete(url);
            onClose();
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
                    <DialogTitle className="font-bold text-center text-2xl">Delete message</DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to delete this message?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-base px-6 py-4 ">
                    <div className="flex items-center w-[50%] justify-between m-auto">
                        <Button disabled={isLoading} onClick={onClose} variant="default">
                            Cancel
                        </Button>
                        <Button disabled={isLoading} onClick={onClick} variant="destructive">
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}