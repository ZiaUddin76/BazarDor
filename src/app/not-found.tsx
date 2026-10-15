
import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-[70vh] flex-col items-center justify-center bg-white px-4 text-center">
            <p className="text-8xl font-extrabold text-green-600">
                404
            </p>

            <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
                পেজটি খুঁজে পাওয়া যায়নি!
            </h1>

            <p className="mt-3 max-w-md text-gray-600">
                দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি।
                পেজটি সরানো হয়েছে অথবা ঠিকানাটি ভুল হতে পারে।
            </p>

            <Link
                href="/"
                className="mt-6 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
            >
                ← হোম পেজে ফিরে যান
            </Link>
        </main>
    );
}
