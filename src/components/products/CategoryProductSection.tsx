"use client";

import { useState } from "react";
import type { Product } from "./product.types";
import CategoryProductSort from "./CategoryProductSort";
import AllProducts from "./AllProducts";

interface CategoryProductSectionProps {
    products: Product[];
}

const CategoryProductSection = ({
    products,
}: CategoryProductSectionProps) => {
    const [sort, setSort] = useState("default");

    const sortedProducts = [...products];

    if (sort === "asc") {
        sortedProducts.sort((a, b) => a.today - b.today);
    } else if (sort === "desc") {
        sortedProducts.sort((a, b) => b.today - a.today);
    }

    return (
        <>
            <CategoryProductSort onSortChange={setSort} />

            <AllProducts
                products={sortedProducts}
                showTitle={false}
            />
        </>
    );
};

export default CategoryProductSection;