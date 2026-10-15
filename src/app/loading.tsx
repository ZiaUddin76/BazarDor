
import ProductSkeleton from "@/components/products/ProductSkeleton";

export default function Loading() {
    return (
        <main className="mx-auto w-full max-w-6xl px-4 py-8">
            {/* Hero skeleton */}
            <section className="mb-10 animate-pulse rounded-2xl bg-gray-100 p-8 sm:p-12">
                <div className="mb-4 h-4 w-32 rounded bg-gray-200" />
                <div className="mb-4 h-8 w-3/4 rounded bg-gray-200 sm:h-10" />
                <div className="mb-3 h-4 w-full max-w-lg rounded bg-gray-200" />
                <div className="mb-6 h-4 w-2/3 max-w-md rounded bg-gray-200" />
                <div className="h-11 w-40 rounded-lg bg-gray-200" />
            </section>

            {/* Price increase skeleton */}
            <section className="mb-10">
                <div className="mb-5 h-7 w-48 animate-pulse rounded bg-gray-200" />
                <ProductSkeleton count={3} />
            </section>

            {/* Price decrease skeleton */}
            <section className="mb-10">
                <div className="mb-5 h-7 w-48 animate-pulse rounded bg-gray-200" />
                <ProductSkeleton count={3} />
            </section>

            {/* All products skeleton */}
            <section className="mb-10">
                <div className="mb-5 h-7 w-32 animate-pulse rounded bg-gray-200" />
                <div className="mb-5 h-4 w-56 animate-pulse rounded bg-gray-100" />
                <ProductSkeleton count={9} />
            </section>
        </main>
    );
}
