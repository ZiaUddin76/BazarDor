import Hero from "@/components/Hero";
import { getProducts } from "@/lib/products";
import AllProducts from "@/components/products/AllProducts";
import PriceUp from "@/components/products/PriceUp";
import PriceDown from "@/components/products/PriceDown";


export default async function Home() {


  const products = await getProducts();


  return (

    <>


      <Hero />

      <PriceUp products={products} />

      <PriceDown products={products} />

      <AllProducts products={products} />



    </>

  );
}