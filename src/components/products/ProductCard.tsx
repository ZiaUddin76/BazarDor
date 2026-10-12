interface ProductCardProps {
    name: string;
    emoji: string;
    unit: string;
    price: number;
    change: {
        dir: "up" | "down" | "flat";
        pct: number;
    };
}

const ProductCard = ({
    name,
    emoji,
    unit,
    price,
    change,
}: ProductCardProps) => {
    const bengaliNumber = (value: number) => {
        return value.toLocaleString("bn-BD");
    };

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md">
            <div className="mb-4 flex items-center gap-3">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#F8F9F5] text-4xl">
                    {emoji}
                </div>

                <div className="min-w-0">
                    <h3 className="text-lg font-bold text-gray-900">
                        {name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        {unit}
                    </p>
                </div>
            </div>

            <div className="mt-4 border-t border-gray-100 pt-3">
                <p className="text-sm text-gray-500">
                    আজকের দাম
                </p>

                <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xl font-bold text-gray-900">
                        {bengaliNumber(price)} টাকা
                    </p>

                    <span
                        className={`rounded-md px-2 py-1 text-xs font-semibold ${change.dir === "up"
                            ? "bg-red-50 text-red-600"
                            : change.dir === "down"
                                ? "bg-green-50 text-green-600"
                                : "bg-gray-100 text-gray-500"
                            }`}
                    >
                        {change.dir === "up"
                            ? "▲"
                            : change.dir === "down"
                                ? "▼"
                                : "—"}{" "}
                        {Math.abs(change.pct).toLocaleString("bn-BD", {
                            minimumFractionDigits: 1,
                            maximumFractionDigits: 1,
                        })}%
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;