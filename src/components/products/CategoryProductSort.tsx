
"use client";

import { useState } from "react";

interface CategoryProductSortProps {
    onSortChange: (sort: string) => void;
}

const CategoryProductSort = ({
    onSortChange,
}: CategoryProductSortProps) => {
    const [sort, setSort] = useState("default");

    const handleSortChange = (value: string) => {
        setSort(value);
        onSortChange(value);
    };

    return (
        <section className="flex justify-end rounded-xl border border-gray-200 bg-white p-3">
            <div className="flex items-center gap-3">
                <span className="text-sm text-gray-700">সাজান</span>

                <select
                    value={sort}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
                >
                    <option value="default">ডিফল্ট</option>
                    <option value="asc">দাম: কম থেকে বেশি</option>
                    <option value="desc">দাম: বেশি থেকে কম</option>
                </select>
            </div>
        </section>
    );
};

export default CategoryProductSort;
