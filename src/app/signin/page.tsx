"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa";

const SignInForm = () => {

    const searchParams = useSearchParams();

    const callbackURL = searchParams.get("callbackURL");

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        setError("");
        setIsLoading(true);

        try {
            const result = await authClient.signIn.email({
                email,
                password,
            });


            if (result.error) {
                const errorMessage =
                    "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়, আবার চেষ্টা করুন।";

                setError(errorMessage);
                toast.error(errorMessage);
                return;
            }

            toast.success("সফলভাবে সাইন ইন হয়েছে");

            // console.log("Redirect destination:", callbackURL);

            const destination =
                callbackURL?.startsWith("/") &&
                    !callbackURL.startsWith("//")
                    ? callbackURL
                    : "/";

            window.location.assign(destination);
        } catch {
            toast.error("সাইন ইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-[#F4F4F2] px-4 py-10">
            <div className="mb-8 text-center">
                <h2 className="mt-4 text-2xl font-bold text-gray-900">
                    সাইন ইন
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                </p>
            </div>

            <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="পাসওয়ার্ড লিখুন"
                            autoComplete="current-password"
                            minLength={8}
                            required
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                        />
                    </div>

                    {error && (
                        <p role="alert" className="text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        suppressHydrationWarning
                        className="w-full cursor-pointer rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isLoading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
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
                        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-2 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:text-base"
                    >
                        <span className="text-lg font-bold">G</span>
                        Google দিয়ে চালিয়ে যান
                    </button>

                    <button
                        type="button"
                        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-2 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:text-base"
                    >
                        <FaGithub className="h-5 w-5" />

                        GitHub দিয়ে চালিয়ে যান
                    </button>
                </div>

                <p className="mt-6 text-center text-sm text-gray-600">
                    অ্যাকাউন্ট নেই?{" "}
                    <Link
                        href="/signup"
                        className="font-semibold text-green-700 transition hover:text-green-800"
                    >
                        সাইন আপ করুন
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

const SignInPage = () => {
    return (
        <Suspense
            fallback={
                <main className="flex min-h-screen items-center justify-center bg-[#F4F4F2]">
                    <p className="text-sm text-gray-500">লোড হচ্ছে...</p>
                </main>
            }
        >
            <SignInForm />
        </Suspense>
    );
};

export default SignInPage;