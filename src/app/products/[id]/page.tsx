import { auth } from "@/lib/auth";
import { getProductById } from "@/lib/products";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

interface ProductDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}




const ProductDetailsContent = async ({
    params,
}: ProductDetailsPageProps) => {


    const { id } = await params;


    const requestHeaders = await headers();

    const session = await auth.api.getSession({
        headers: requestHeaders,
    });

    if (!session) {
        redirect(`/signin?callbackURL=${encodeURIComponent(`/products/${id}`)}`);
    }



    const product = await getProductById(Number(id));

    if(!product) {
        notFound();
    }

    return (
        <main className="mx-auto w-full max-w-6xl px-4 py-8">


            {/* Breadcrumb */}
            <nav
                aria-label="Breadcrumb"
                className="mb-6 flex flex-wrap items-center gap-2 text-sm"
            >
                <Link
                    href="/"
                    className="text-gray-500 transition-colors hover:text-gray-900"
                >
                    হোম
                </Link>

                <span className="text-gray-400">&gt;</span>

                <Link
                    href={`/categories/${product.category}`}
                    className="text-gray-500 transition-colors hover:text-gray-900"
                >
                    {product.categoryNameBn}
                </Link>

                <span className="text-gray-400">&gt;</span>

                <span
                    aria-current="page"
                    className="font-medium text-gray-900"
                >
                    {product.nameBn}
                </span>
            </nav>


            <section className="flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center sm:gap-6">

                {/* Product image */}
                {/* Product image */}
                <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-6xl">
                    {product.image}
                </div>

                {/* Product information */}
                <div className="min-w-0 flex-1">
                    <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                        {product.nameBn}
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        প্রতি {product.unit === "kg" ? "কেজি" : product.unit} · {product.categoryNameBn}
                    </p>

                    <p className="mt-3 text-sm text-gray-600">
                        {product.change.dir === "up"
                            ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${(product.today - product.yesterday).toLocaleString("bn-BD")} টাকা`
                            : product.change.dir === "down"
                                ? `গতকালের তুলনায় আজ দাম কমেছে · ${(product.yesterday - product.today).toLocaleString("bn-BD")} টাকা`
                                : "গতকালের তুলনায় আজ দাম অপরিবর্তিত"}
                    </p>
                </div>

                {/* Today's price and percentage — right side */}
                <div className="flex shrink-0 flex-col items-center rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-center sm:min-w-36">
                    <p className="text-sm text-gray-500">
                        আজকের দাম
                    </p>

                    <p className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                        {product.today.toLocaleString("bn-BD")}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                        টাকা/{product.unit}
                    </p>

                    <p
                        className={`mt-3 inline-block rounded-full px-3 py-1 text-sm font-semibold ${product.change.dir === "up"
                            ? "bg-red-100 text-red-600"
                            : product.change.dir === "down"
                                ? "bg-green-100 text-green-600"
                                : "bg-gray-200 text-gray-500"
                            }`}
                    >
                        {product.change.dir === "up" ? "+" : ""}
                        {product.change.pct.toLocaleString("bn-BD")}%
                    </p>
                </div>


            </section>


            {/* Market-wise today's prices */}
            <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">

                {/* Market Price Summary */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {(() => {
                        const markets = product.markets;

                        if (markets.length === 0) return null;

                        const lowestMarket = markets.reduce((lowest, current) =>
                            current.min < lowest.min ? current : lowest
                        );

                        const highestMarket = markets.reduce((highest, current) =>
                            current.max > highest.max ? current : highest
                        );

                        const averagePrice = (lowestMarket.min + highestMarket.max) / 2;

                        const summaries = [
                            {
                                title: "সর্বনিম্ন দাম",
                                price: lowestMarket.min,
                                market: lowestMarket.market,
                                color: "text-green-600",
                                background: "bg-green-50",
                            },
                            {
                                title: "সর্বাধিক দাম",
                                price: highestMarket.max,
                                market: highestMarket.market,
                                color: "text-red-600",
                                background: "bg-red-50",
                            },
                            {
                                title: "গড় দাম",
                                price: averagePrice,
                                market: `প্রতি কেজি-এর হিসাবে`,
                                color: "text-gray-900",
                                background: "bg-gray-50",
                            },
                        ];

                        return summaries.map((item) => (
                            <div
                                key={item.title}
                                className={`rounded-2xl border border-gray-200 ${item.background} p-5`}
                            >
                                <p className="text-sm font-medium text-gray-600">
                                    {item.title}
                                </p>

                                <p className={`mt-2 text-2xl font-bold ${item.color}`}>
                                    ৳{item.price.toLocaleString("bn-BD", {
                                        maximumFractionDigits: 2,
                                    })}
                                </p>

                                <p className="mt-2 text-sm text-gray-600">
                                    {item.title === "গড় দাম"
                                        ? item.market
                                        : `সবচেয়ে ${item.title === "সর্বনিম্ন দাম" ? "কম" : "বেশি"} দামের বাজার: ${item.market}`}
                                </p>
                            </div>
                        ));
                    })()}
                </div>


                <div className="mb-5">
                    <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                        বাজারভিত্তিক আজকের দাম
                    </h2>

                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="w-full min-w-[650px] text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 bg-gray-50 text-gray-600">
                                <th className="rounded-l-lg px-4 py-3 text-left font-semibold">
                                    বাজার
                                </th>

                                <th className="px-4 py-3 text-left font-semibold">
                                    বিভাগ
                                </th>

                                <th className="px-4 py-3 text-right font-semibold">
                                    সর্বনিম্ন
                                </th>

                                <th className="px-4 py-3 text-right font-semibold">
                                    সর্বাধিক
                                </th>

                                <th className="rounded-r-lg px-4 py-3 text-right font-semibold">
                                    গড় দাম
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {[...product.markets]
                                .sort((a, b) => a.min - b.min)
                                .map((market, index) => {
                                    const average = (market.min + market.max) / 2;

                                    return (
                                        <tr
                                            key={`${market.market}-${index}`}
                                            className={`border-b border-gray-100 transition-colors last:border-0 ${index % 2 === 0 ? "bg-white" : "bg-[#F4F4F2]"
                                                } hover:bg-gray-100`}
                                        >
                                            <td className="px-4 py-4 font-medium text-gray-900">
                                                {market.market}
                                            </td>

                                            <td className="px-4 py-4 text-gray-600">
                                                {market.division}
                                            </td>

                                            <td className="px-4 py-4 text-right text-gray-700">
                                                {market.min.toLocaleString("bn-BD")} টাকা
                                            </td>

                                            <td className="px-4 py-4 text-right text-gray-700">
                                                {market.max.toLocaleString("bn-BD")} টাকা
                                            </td>

                                            <td className="px-4 py-4 text-right font-semibold text-gray-900">
                                                {average.toLocaleString("bn-BD", {
                                                    maximumFractionDigits: 2,
                                                })} টাকা
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>

                {product.markets.length === 0 && (
                    <p className="py-8 text-center text-sm text-gray-500">
                        এই পণ্যের কোনো বাজারের তথ্য পাওয়া যায়নি।
                    </p>
                )}
            </section>


        </main>
    );
};

const ProductDetailsPage = ({
    params,
}: ProductDetailsPageProps) => {
    return (
        <Suspense
            fallback={
                <main className="mx-auto w-full max-w-6xl px-4 py-8">
                    <p className="text-gray-500">
                        পণ্যের তথ্য লোড হচ্ছে...
                    </p>
                </main>
            }
        >
            <ProductDetailsContent params={params} />
        </Suspense>
    );
};

export default ProductDetailsPage;