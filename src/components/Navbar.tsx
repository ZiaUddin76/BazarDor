import Image from 'next/image';
import React from 'react';
import DateDisplay from './DateDisplay';
import Link from 'next/link';

const Navbar = () => {
    return (
        <header className="border-b border-gray-300 pb-3 bg-white">
            <div className="flex items-center justify-between max-w-5xl mx-auto gap-3 px-4">

                <Link href="/" className="flex items-center gap-2 min-w-0">
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

                <div className="flex items-center gap-1 sm:gap-3 shrink-0">

                    <Link href="/signin"
                     className="px-2.5 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-base rounded-md transition-colors hover:bg-gray-200 cursor-pointer font-bold whitespace-nowrap">
                        সাইন ইন
                    </Link>

                    <Link href="/signup"
                     className="px-2.5 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-base rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors cursor-pointer font-bold whitespace-nowrap">
                        সাইন আপ
                    </Link>

                </div>

            </div>
        </header>
    );
};

export default Navbar;