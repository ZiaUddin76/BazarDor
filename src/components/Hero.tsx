import Link from 'next/link';
import React from 'react';
import DateDisplay from './DateDisplay';
import Image from 'next/image';

const Hero = () => {
    return (
        <section
            className="mx-auto mt-4 max-w-6xl rounded-2xl border border-gray-200 bg-[#FEFEFA] px-4 py-12 sm:px-8 sm:py-16"
            id="products"
        >
            <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">

                {/* Left side: Hero content */}
                <div className="w-full flex-1">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm text-green-800">
                        <span className="h-2 w-2 rounded-full bg-green-600"></span>
                        <DateDisplay />
                    </div>

                    <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-5xl">
                        <span className="whitespace-nowrap">আজকের বাজারের দাম এক</span>
                        <br />
                        নজরে
                    </h1>

                    <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম
                        — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                    </p>

                    <Link
                        href="#products-list"
                        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-green-700"
                    >
                        সব পণ্য দেখুন
                        <span aria-hidden="true">↓</span>
                    </Link>
                </div>

                {/* Right side: Hero image */}
                <div className="relative w-full flex-1">
                    <Image
                        src="/bazar-hero.png"
                        alt="তাজা শাকসবজি ও নিত্যপ্রয়োজনীয় বাজারের পণ্য"
                        width={600}
                        height={450}
                        priority
                        className="h-64 w-full rounded-xl object-cover sm:h-80"
                    />
                </div>

            </div>
        </section>
    );
};

export default Hero;