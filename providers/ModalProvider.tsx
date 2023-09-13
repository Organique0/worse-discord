"use client";

import { CreateChannelModal } from "@/components/modals/createChannelModal";
import { CreateServerModal } from "@/components/modals/createServerModal";
import { DeleteServerModal } from "@/components/modals/deleteServerModal";
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
        </>
    );
}

export default ModalProvider;