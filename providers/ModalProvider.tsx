"use client";

import { CreateServerModal } from "@/components/modals/createServerModal";
import { EditServerModal } from "@/components/modals/editServerModal";
import { InviteModal } from "@/components/modals/inviteModal";
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
        </>
    );
}

export default ModalProvider;