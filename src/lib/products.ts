import type { Product } from "@/components/products/product.types";
import { cacheLife } from "next/cache";

export async function getProducts(): Promise<Product[]> {

    "use cache";

    cacheLife("minutes");

    const res = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/products"
    );

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    const products: Product[] = await res.json();

    return products;

}



export async function getProductsByCategory(
    categorySlug: string
): Promise<Product[]> {
    "use cache";

    cacheLife("minutes");

    const res = await fetch(
        `https://openapi.programming-hero.com/api/bazardor/products?category=${categorySlug}`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch category products");
    }

    const products: Product[] = await res.json();

    return products;

}