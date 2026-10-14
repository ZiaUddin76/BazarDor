
"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

const SignUpPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGoogleSignUp = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch {
            toast.error("Google দিয়ে সাইন আপ করতে সমস্যা হয়েছে।");
        }
    };

    const handleGitHubSignUp = async () => {
        try {
            await authClient.signIn.social({
                provider: "github",
                callbackURL: "/",
            });
        } catch {
            toast.error("GitHub দিয়ে সাইন আপ করতে সমস্যা হয়েছে।");
        }
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setError("");

        const formData = new FormData(e.currentTarget);

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (password !== confirmPassword) {
            const errorMessage = "দুটি পাসওয়ার্ড মিলছে না।";

            setError(errorMessage);
            toast.error(errorMessage);
            return;
        }

        setLoading(true);

        try {
            const result = await authClient.signUp.email({
                name,
                email,
                password,
                callbackURL: "/",
            });

            if (result.error) {
                const errorMessage =
                    result.error.message ||
                    "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।";

                setError(errorMessage);
                toast.error(errorMessage);
                return;
            }

            window.location.assign("/");
        } catch {
            const errorMessage =
                "কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।";

            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-[#F4F4F2] px-4 py-10">
            <div className="mb-8 text-center">
                <h2 className="mt-4 text-2xl font-bold text-gray-900">
                    অ্যাকাউন্ট তৈরি করুন
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                </p>
            </div>

            <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                        <p
                            role="alert"
                            className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
                        >
                            {error}
                        </p>
                    )}

                    <div>
                        <label
                            htmlFor="name"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            নাম
                        </label>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="আপনার নাম লিখুন"
                            autoComplete="name"
                            required
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            ইমেইল
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="আপনার ইমেইল লিখুন"
                            autoComplete="email"
                            required
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            পাসওয়ার্ড
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="পাসওয়ার্ড লিখুন"
                            autoComplete="new-password"
                            minLength={8}
                            required
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            পাসওয়ার্ড নিশ্চিত করুন
                        </label>

                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="পাসওয়ার্ড আবার লিখুন"
                            autoComplete="new-password"
                            minLength={8}
                            required
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full cursor-pointer rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading
                            ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
                            : "অ্যাকাউন্ট তৈরি করুন"}
                    </button>
                </form>

                <div className="my-6 flex items-center gap-4">
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="text-sm text-gray-500">অথবা</span>
                    <div className="h-px flex-1 bg-gray-200" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={handleGoogleSignUp}
                        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-2 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:text-base"
                    >
                        <span className="text-lg font-bold">G</span>
                        Google দিয়ে চালিয়ে যান
                    </button>

                    <button
                        type="button"
                        onClick={handleGitHubSignUp}
                        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-2 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:text-base"
                    >
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            className="h-5 w-5 shrink-0 fill-current"
                        >
                            <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.7 2.63 1.21 3.27.92.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.53 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.05-1.15 3.05-1.15.61 1.53.23 2.67.11 2.95.72.78 1.15 1.78 1.15 3 0 4.3-2.61 5.25-5.1 5.53.4.35.76 1.03.76 2.08V22c0 .29.2.63.76.52A11.1 11.1 0 0 0 12 .9Z" />
                        </svg>

                        GitHub দিয়ে চালিয়ে যান
                    </button>
                </div>

                <p className="mt-6 text-center text-sm text-gray-600">
                    অ্যাকাউন্ট আছে?{" "}
                    <Link
                        href="/signin"
                        className="font-semibold text-green-700 transition hover:text-green-800"
                    >
                        সাইন ইন করুন
                    </Link>
                </p>
            </div>

            <Link
                href="/"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-green-700"
            >
                <span aria-hidden="true">←</span>
                হোম পেজে ফিরে যান
            </Link>
        </main>
    );
};

export default SignUpPage;
