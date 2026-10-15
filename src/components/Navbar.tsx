"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import DateDisplay from "./DateDisplay";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";

const Navbar = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
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
        <header className="border-b border-gray-300 bg-white pb-3">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4">

                {/* Logo and date */}
                <Link
                    href="/"
                    className="flex min-w-0 items-center gap-2"
                >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-green-600">
                        <Image
                            src="/logo-icon.png"
                            alt="Website Logo"
                            width={20}
                            height={20}
                        />
                    </div>

                    <div className="min-w-0">
                        <p className="font-semibold text-gray-900">
                            বাজার দর
                        </p>
                        <DateDisplay />
                    </div>
                </Link>

                {/* Authentication */}
                <div className="flex shrink-0 items-center gap-1 sm:gap-3">

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
                                className="cursor-pointer flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-2 py-1.5 transition-colors hover:bg-gray-50 sm:px-3"
                                title="Profile menu"
                                aria-label="Open profile menu"
                                aria-expanded={dropdownOpen}
                            >
                                {/* Profile picture */}
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-green-600 font-bold text-white">
                                    {user.image ? (
                                        <Image
                                            src={user.image}
                                            alt={user.name || "Profile"}
                                            width={32}
                                            height={32}
                                            unoptimized
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        user.name?.charAt(0)?.toUpperCase() ||
                                        "U"
                                    )}
                                </div>

                                {/* First name */}
                                <span className="max-w-28 truncate text-sm font-semibold text-gray-800">
                                    {user.name?.trim().split(/\s+/)[0] ||
                                        "ব্যবহারকারী"}
                                </span>

                                {/* Down arrow */}
                                <IoChevronDown
                                    className={`h-4 w-4 shrink-0 text-gray-500 transition-transform ${dropdownOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {/* Dropdown menu */}
                            {dropdownOpen && (
                                <div className="absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-lg border border-gray-200 bg-white py-2 shadow-lg">

                                    {/* Full name and email */}
                                    <div className="border-b border-gray-200 px-4 pb-3 pt-2">
                                        <p className="truncate text-sm font-semibold text-gray-900">
                                            {user.name || "ব্যবহারকারী"}
                                        </p>

                                        <p className="mt-1 truncate text-xs text-gray-500">
                                            {user.email}
                                        </p>
                                    </div>

                                    {/* Profile */}
                                    <Link
                                        href="/profile"
                                        onClick={() =>
                                            setDropdownOpen(false)
                                        }
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-100"
                                    >
                                        <FaUser className="h-4 w-4 text-gray-500" />

                                        আমার প্রোফাইল
                                    </Link>

                                    {/* Sign out */}
                                    <button
                                        type="button"
                                        onClick={handleSignOut}
                                        className="cursor-pointer flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
                                    >
                                        <FaSignOutAlt className="h-4 w-4" />

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
                                className="rounded-md px-2.5 py-1.5 text-sm font-bold transition-colors hover:bg-gray-200 sm:px-4 sm:py-2 sm:text-base"
                            >
                                সাইন ইন
                            </Link>

                            <Link
                                href="/signup"
                                className="whitespace-nowrap rounded-md bg-green-500 px-2.5 py-1.5 text-sm font-bold text-white transition-colors hover:bg-green-600 sm:px-4 sm:py-2 sm:text-base"
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