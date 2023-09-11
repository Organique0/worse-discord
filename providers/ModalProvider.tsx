"use client";

import AuthModal from "@/components/auth-form";
import { CreateServerModal } from "@/components/modals/createServerModal";
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
            <AuthModal />
            <CreateServerModal />
        </>
    );
}

export default ModalProvider;