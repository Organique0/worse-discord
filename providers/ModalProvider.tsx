"use client";

import { MessageFileModal } from "@/components/modals/MessageFileModal";
import { CreateChannelModal } from "@/components/modals/createChannelModal";
import { CreateServerModal } from "@/components/modals/createServerModal";
import { DeleteChannelModal } from "@/components/modals/deleteChannelModal";
import { DeleteServerModal } from "@/components/modals/deleteServerModal";
import { EditChannelModal } from "@/components/modals/editChannelModal";
import { EditServerModal } from "@/components/modals/editServerModal";
import { InviteModal } from "@/components/modals/inviteModal";
import { LeaveServerModal } from "@/components/modals/leaveServerModal";
import { MembersModal } from "@/components/modals/membersModal";
import { useEffect, useState } from "react";


const ModalProvider: React.FC = () => {
    const [isMouted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMouted) {
        return null;
    }

    return (
        <>
            <CreateServerModal />
            <InviteModal />
            <EditServerModal />
            <MembersModal />
            <CreateChannelModal />
            <LeaveServerModal />
            <DeleteServerModal />
            <DeleteChannelModal />
            <EditChannelModal />
            <MessageFileModal />
        </>
    );
}

export default ModalProvider;