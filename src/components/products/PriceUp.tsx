import { Product } from "./product.types";
import ProductCard from "./ProductCard";


interface PriceUpProps {
    products: Product[];
}


const PriceUp = ({ products }: PriceUpProps) => {


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


    const topRisers = products
        .filter((product) => product.change.dir === "up")
        .sort((a, b) => b.change.pct - a.change.pct)
        .slice(0, 6);


    return (

        <section className="mx-auto w-full max-w-6xl px-4 py-10">
            <h2 className="text-2xl font-bold text-gray-900">
                <span className="text-red-600">▲</span> আজ দাম বেড়েছে
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {topRisers.map((product) => (
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

export default PriceUp;