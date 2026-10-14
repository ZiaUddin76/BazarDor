"use client";

import { authClient } from "@/lib/auth-client";
import { FaSignOutAlt } from "react-icons/fa";

export default function SignOutButton() {
    const handleSignOut = async () => {
        await authClient.signOut();
        window.location.assign("/");
    };

    return (
        <button
            type="button"
            onClick={handleSignOut}
            className="flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-5 py-2.5 font-medium text-red-600 transition hover:bg-red-50"
        >
            <FaSignOutAlt className="h-4 w-4" />
            সাইন আউট
        </button>
    );
}