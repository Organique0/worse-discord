"use client";

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
            <CreateServerModal />
        </>
    );
}

export default ModalProvider;