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




export async function getProductById(id: number): Promise<Product | null> {
    const res = await fetch(
        `https://openapi.programming-hero.com/api/bazardor/products/${id}`
    );

    if (res.status === 404) {
        return null;
    }

    if (!res.ok) {
        throw new Error("Failed to fetch product");
    }

    const data = await res.json();

    // Handle API responses that indicate the product was not found.
    if (
        !data ||
        data.success === false ||
        data.status === false
    ) {
        return null;
    }

    // Support either a direct product object or a wrapped response.
    const product = data.data ?? data;

    if (
        !product ||
        typeof product !== "object" ||
        !("nameBn" in product)
    ) {
        return null;
    }

    return product as Product;
}
