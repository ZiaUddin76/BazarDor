"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import DateDisplay from "./DateDisplay";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Navbar = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const router = useRouter();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    // Sign out
    const handleSignOut = async () => {
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        setDropdownOpen(false);
                        toast.success("সফলভাবে সাইন আউট হয়েছে");
                        router.push("/signin");
                        router.refresh();
                    },
                    onError: (error) => {
                        toast.error(
                            error.error.message || "সাইন আউট করা যায়নি"
                        );
                    },
                },
            });
        } catch {
            toast.error("সাইন আউট করতে সমস্যা হয়েছে");
        }
    };

    return (
        <header className="border-b border-gray-300 pb-3 bg-white">
            <div className="flex items-center justify-between max-w-5xl mx-auto gap-3 px-4">

                {/* Logo and date */}
                <Link
                    href="/"
                    className="flex items-center gap-2 min-w-0"
                >
                    <Image
                        src="/logo-icon.png"
                        alt="Website Logo"
                        width={20}
                        height={20}
                    />

                    <div>
                        <p>বাজার দর</p>
                        <DateDisplay />
                    </div>
                </Link>

                {/* Authentication */}
                <div className="flex items-center gap-1 sm:gap-3 shrink-0">

                    {/* Signed-in user */}
                    {!isPending && user && (
                        <div
                            className="relative"
                            ref={dropdownRef}
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    setDropdownOpen((prev) => !prev)
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-green-600 font-bold text-white overflow-hidden"
                                title={user.name || "Profile"}
                                aria-label="Open profile menu"
                                aria-expanded={dropdownOpen}
                            >
                                {user.image ? (
                                    <Image
                                        src={user.image}
                                        alt={user.name || "Profile"}
                                        width={36}
                                        height={36}
                                        unoptimized
                                        className="h-9 w-9 rounded-full object-cover"
                                    />
                                ) : (
                                    user.name?.charAt(0)?.toUpperCase() || "U"
                                )}
                            </button>

                            {/* Dropdown menu */}
                            {dropdownOpen && (
                                <div className="absolute right-0 top-12 z-50 w-48 rounded-md border border-gray-200 bg-white py-2 shadow-lg">

                                    <Link
                                        href="/profile"
                                        onClick={() =>
                                            setDropdownOpen(false)
                                        }
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        আমার প্রোফাইল
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={handleSignOut}
                                        className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                                    >
                                        সাইন আউট
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Signed-out user */}
                    {!isPending && !user && (
                        <>
                            <Link
                                href="/signin"
                                className="px-2.5 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-base rounded-md transition-colors hover:bg-gray-200 font-bold whitespace-nowrap"
                            >
                                সাইন ইন
                            </Link>

                            <Link
                                href="/signup"
                                className="px-2.5 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-base rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors font-bold whitespace-nowrap"
                            >
                                সাইন আপ
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
