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
                                <svg
                                    className={`h-4 w-4 shrink-0 text-gray-500 transition-transform ${dropdownOpen ? "rotate-180" : ""
                                        }`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.22 7.22a.75.75 0 011.06 0L10 10.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 8.28a.75.75 0 010-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
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
                                        <svg
                                            className="h-4 w-4 text-gray-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={1.8}
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.1a7.5 7.5 0 0115 0"
                                            />
                                        </svg>

                                        আমার প্রোফাইল
                                    </Link>

                                    {/* Sign out */}
                                    <button
                                        type="button"
                                        onClick={handleSignOut}
                                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
                                    >
                                        <svg
                                            className="h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={1.8}
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 15l3-3m0 0l-3-3m3 3H9"
                                            />
                                        </svg>

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