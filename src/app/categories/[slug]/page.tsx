
import CategoryProductSection from "@/components/products/CategoryProductSection";
import { getProductsByCategory } from "@/lib/products";
import { Suspense } from "react";


interface CategoryPageProps {
    params: Promise<{
        slug: string;
    }>;
}

const CategoryContent = async ({ params }: CategoryPageProps) => {
    const { slug } = await params;

    const products = await getProductsByCategory(slug);

    const categoryIcon = products[0]?.categoryIcon ?? "🛒";
    const categoryName = products[0]?.categoryNameBn ?? slug;

    return (

        <main className="mx-auto w-full max-w-6xl px-4 py-8">
            <section className="mb-8 flex items-center gap-5 rounded-2xl border border-gray-200 bg-white p-5 sm:p-7">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-green-50 text-5xl sm:h-32 sm:w-32">
                    {categoryIcon}
                </div>

                <div>
                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                        {categoryName}
                    </h1>

                    <p className="mt-2 text-sm text-gray-500 sm:text-base">
                        {products.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন
                    </p>
                </div>
            </section>

            <CategoryProductSection products={products} />


        </main>

    );
};

const CategoryPage = ({ params }: CategoryPageProps) => {
    return (
        <Suspense
            fallback={
                <main className="mx-auto w-full max-w-6xl px-4 py-8">
                    <p className="text-gray-500">পণ্য লোড হচ্ছে...</p>
                </main>
            }
        >
            <CategoryContent params={params} />
        </Suspense>
    );
};

export default CategoryPage;
