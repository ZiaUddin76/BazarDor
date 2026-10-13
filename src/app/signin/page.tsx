"use client";

import Link from "next/link";
import React from "react";

const SignUpPage = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-[#F4F4F2] px-4 py-10">

            {/* Headings outside the white card */}
            <div className="mb-8 text-center">

                <h2 className="mt-4 text-2xl font-bold text-gray-900">
                    সাইন ইন
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                </p>
            </div>

            {/* White signup card */}
            <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email */}
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

                    {/* Password */}
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



                    {/* Signup button */}
                    <button
                        type="submit"
                        className="cursor-pointer w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700"
                    >
                        সাইন ইন
                    </button>
                </form>

                {/* Divider */}
                <div className="my-6 flex items-center gap-4">
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="text-sm text-gray-500">অথবা</span>
                    <div className="h-px flex-1 bg-gray-200" />
                </div>

                {/* Social signup buttons */}
                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-2 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:text-base"
                    >
                        <span className="text-lg font-bold">G</span>
                        Google দিয়ে চালিয়ে যান
                    </button>

                    <button
                        type="button"
                        className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-2 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 sm:text-base"
                    >
                        <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            className="h-5 w-5 fill-current"
                        >
                            <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.7 2.63 1.21 3.27.92.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.53 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.45 3.05-1.15 3.05-1.15.61 1.53.23 2.67.11 2.95.72.78 1.15 1.78 1.15 3 0 4.3-2.61 5.25-5.1 5.53.4.35.76 1.03.76 2.08V22c0 .29.2.63.76.52A11.1 11.1 0 0 0 12 .9Z" />
                        </svg>

                        GitHub দিয়ে চালিয়ে যান
                    </button>
                </div>

                {/* Sign in link */}
                <p className="mt-6 text-center text-sm text-gray-600">
                    অ্যাকাউন্ট নেয়?{" "}
                    <Link
                        href="/signup"
                        className="font-semibold text-green-700 transition hover:text-green-800"
                    >
                        সাইন আপ করুন
                    </Link>
                </p>
            </div>


            {/* Back to Home */}
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