import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";

async function ProfileContent() {
    const requestHeaders = await headers();

    const session = await auth.api.getSession({
        headers: requestHeaders,
    });

    if (!session) {
        redirect("/signin");
    }

    const user = session.user;

    return (
        <main className="mx-auto max-w-5xl px-4 py-8">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h1 className="mb-6 text-2xl font-bold text-gray-900">
                    আমার প্রোফাইল
                </h1>

                <div className="flex flex-col items-center gap-4 sm:flex-row">
                    {user.image ? (
                        <Image
                            src={user.image}
                            alt={user.name || "Profile"}
                            width={96}
                            height={96}
                            unoptimized
                            className="h-24 w-24 rounded-full object-cover"
                        />
                    ) : (
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-600 text-3xl font-bold text-white">
                            {user.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                    )}

                    <div className="text-center sm:text-left">
                        <h2 className="text-xl font-semibold text-gray-900">
                            {user.name || "ব্যবহারকারী"}
                        </h2>

                        <p className="mt-1 text-gray-600">
                            {user.email}
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default function ProfilePage() {
    return (
        <Suspense
            fallback={
                <main className="flex min-h-[50vh] items-center justify-center">
                    <p className="text-gray-600">
                        প্রোফাইল লোড হচ্ছে...
                    </p>
                </main>
            }
        >
            <ProfileContent />
        </Suspense>
    );
}
