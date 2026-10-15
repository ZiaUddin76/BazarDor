
interface ProductSkeletonProps {
    count?: number;
}

const ProductSkeleton = ({ count = 6 }: ProductSkeletonProps) => {
    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className="animate-pulse rounded-xl border border-gray-200 bg-white p-4"
                >
                    {/* Product emoji and name */}
                    <div className="mb-4 flex items-center gap-3">
                        <div className="h-16 w-16 shrink-0 rounded-xl bg-[#F8F9F5]">
                            <div className="h-full w-full rounded-xl bg-gray-200" />
                        </div>

                        <div className="min-w-0 flex-1 space-y-2">
                            <div className="h-5 w-3/4 rounded bg-gray-200" />
                            <div className="h-4 w-1/2 rounded bg-gray-100" />
                        </div>
                    </div>

                    {/* Today's price */}
                    <div className="mt-4 border-t border-gray-100 pt-3">
                        <div className="h-4 w-20 rounded bg-gray-100" />

                        <div className="mt-2 flex items-center justify-between gap-2">
                            <div className="h-6 w-28 rounded bg-gray-200" />
                            <div className="h-7 w-16 rounded-md bg-gray-100" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductSkeleton;
