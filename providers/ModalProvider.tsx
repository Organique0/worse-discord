"use client";

import { CreateServerModal } from "@/components/modals/createServerModal";
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
        </>
    );
}

export default ModalProvider;