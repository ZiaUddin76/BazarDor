"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

const RedirectToast = () => {
    const searchParams = useSearchParams();
    const hasShownToast = useRef(false);

    useEffect(() => {
        if (
            searchParams.get("reason") === "auth-required" &&
            !hasShownToast.current
        ) {
            hasShownToast.current = true;
            toast.error("Please sign in to view this product.");
        }
    }, [searchParams]);

    return null;
};

export default RedirectToast;