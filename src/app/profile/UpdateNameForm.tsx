"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

interface UpdateNameFormProps {
    currentName: string;
}

export default function UpdateNameForm({
    currentName,
}: UpdateNameFormProps) {
    const [name, setName] = useState(currentName);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage("");

        const updatedName = name.trim();

        if (!updatedName) {
            setMessage("নাম লিখুন।");
            return;
        }

        setIsLoading(true);

        try {
            const result = await authClient.updateUser({
                name: updatedName,
            });

            if (result.error) {
                setMessage(result.error.message || "নাম আপডেট করা যায়নি।");
                return;
            }

            setMessage("নাম সফলভাবে আপডেট হয়েছে।");
            window.location.reload();
        } catch {
            setMessage("নাম আপডেট করা যায়নি। আবার চেষ্টা করুন।");
        } finally {
            setIsLoading(false);
        }
    };

    return (

        <div className="px-8">

            <form onSubmit={handleSubmit}>
                <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    নাম:
                </label>

                <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="আপনার নাম লিখুন"
                    required
                    maxLength={100}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3
                 text-gray-900 outline-none transition focus:border-green-600 
                 focus:ring-2 focus:ring-green-100"
                />

                {message && (
                    <p role="status" className="mt-3 text-sm text-gray-700">
                        {message}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-5 w-full rounded-lg bg-green-600 px-5 py-3 font-semibold
                text-white transition hover:bg-green-700 disabled:cursor-not-allowed
                 disabled:opacity-60"
                >
                    {isLoading ? "আপডেট হচ্ছে..." : "আপডেট"}
                </button>
            </form>

        </div>

    );
}