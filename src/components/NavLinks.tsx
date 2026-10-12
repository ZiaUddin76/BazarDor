"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';


interface ICategory {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}



const NavLinks = () => {


    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(
                    "https://openapi.programming-hero.com/api/bazardor/categories"
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch categories");
                }

                const result = await res.json();

                setCategories(
                    Array.isArray(result) ? result : result.data
                );
            }
            catch (error) {
                console.log("Error fetching categories", error);
            }
        };
        fetchCategories();
    }, []);



    return (
        <nav className='border-b border-gray-200 bg-white'>

            <div className='mx-auto flex max-w-5xl gap-2 overflow-x-auto px-4 py-3 '>

                {
                    categories.map((category) => (
                        <Link key={category.id}
                            href={`/categories/${category.slug}`}
                            className='flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm
                     font-medium transition-colors hover:bg-gray-100 sm:text-base'>

                        <span>{category.icon}</span>
                        <span>{category.nameBn}</span>

                        </Link>
                    ))
                }

            </div>

        </nav>
    );
};

export default NavLinks;