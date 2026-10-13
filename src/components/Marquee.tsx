"use client"
import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';


interface IProduct {
    id: number;
    nameBn: string;
    image: string;
    unit: string;
    today: number;
    change: {
        dir: "up" | "down";
        pct: number;
    };
}


const getUnitLabel = (unit: string) => {
    const units: Record<string, string> = {
        kg: "কেজি",
        litre: "লিটার",
        dozen: "ডজন",
        piece: "পিস",
        gram: "গ্রাম",
    };

    return units[unit.toLowerCase()] ?? unit;
};


const NewsMarquee = () => {


    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");

                if (!res.ok) {
                    throw new Error("Failed to fetch products");
                }

                const result = await res.json();

                setProducts(Array.isArray(result) ? result : result.data);
            }
            catch (error) {
                console.log("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);




    return (
        <div className='border-b border-gray-300 py-3 w-full overflow-hidden bg-white'>
            <Marquee speed={100} pauseOnHover>
                {products.map((product) => {
                    // console.log(product.nameBn, product.today, product.unit);

                    const isUp = product.change.dir === "up";

                    return (
                        <div key={product.id}
                            className='flex items-center gap-2 px-4 sm:px-6 whitespace-nowrap
                            text-sm sm:text-base'>
                            <span>{product.image}</span>
                            <span>{product.nameBn}</span>
                            <span>
                                {product.today.toLocaleString("bn-BD")} টাকা/
                                {getUnitLabel(product.unit)}
                            </span>
                            <span className={isUp ? "text-red-600" : "text-green-600"}>
                                {isUp ? "▲" : "▼"}{" "}
                                {product.change.pct.toLocaleString("bn-BD", {
                                    maximumFractionDigits: 1,
                                })}%
                            </span>
                            <span className="ml-4 text-gray-300">|</span>
                        </div>
                    );
                })}
            </Marquee>
        </div>
    );
};

export default NewsMarquee;