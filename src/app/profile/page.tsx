import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import SignOutButton from "./ProfileActions";
import UpdateNameForm from "./UpdateNameForm";

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

        <main className="mx-auto w-full max-w-5xl px-4 py-8">
            {/* Page heading — outside the sections */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    আমার প্রোফাইল
                </h1>

                <p className="mt-2 text-sm text-gray-600">
                    আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                </p>
            </div>

            {/* First section: User profile */}
            <section className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col items-center gap-4 sm:flex-row">
                    {/* User image */}
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
                        <div className="flex h-24 w-24 items-center justify-center rounded-full
                         bg-green-600 text-4xl font-bold text-white">
                            {user.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                    )}

                    {/* Name and email */}
                    <div className="flex-1 text-center sm:text-left">
                        <h2 className="text-4xl font-semibold text-gray-900">
                            {user.name || "ব্যবহারকারী"}
                        </h2>

                        <p className="text-2xl mt-1 text-gray-600">
                            {user.email}
                        </p>
                    </div>

                    <SignOutButton />
                </div>
            </section>

            {/* Second section: Update name */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-5 text-xl font-bold text-gray-900 pb-4">
                    তথ্য
                </h2>

                <UpdateNameForm currentName={user.name || ""} />
            </section>
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
