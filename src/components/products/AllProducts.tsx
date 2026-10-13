
import type { Product } from "./product.types";
import ProductCard from "./ProductCard";

interface AllProductsProps {
    products: Product[];
    showTitle?: boolean;
}

const AllProducts = ({
    products,
    showTitle = true,
}: AllProductsProps) => {

    const getUnitLabel = (unit: string) => {
        const units: Record<string, string> = {
            kg: "প্রতি কেজি",
            litre: "প্রতি লিটার",
            dozen: "প্রতি ডজন",
            piece: "প্রতি পিস",
            gram: "প্রতি গ্রাম",
        };

        return units[unit.toLowerCase()] ?? `প্রতি ${unit}`;
    };


    return (
        <section className="mx-auto w-full max-w-6xl py-10"
        id="products-list">
            {
                showTitle && (
                    <h2 className="text-2xl font-bold text-gray-900">
                        সব পণ্য
                    </h2>
                )
            }

            <p className="mt-2 text-gray-600">
                মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <ProductCard
                        id={product.id}
                        key={product.id}
                        name={product.nameBn}
                        emoji={product.image}
                        unit={getUnitLabel(product.unit)}
                        price={product.today}
                        change={product.change}
                    />
                ))}
            </div>
        </section>
    );
};

export default AllProducts;
