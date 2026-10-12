import Hero from "@/components/Hero";
import { getProducts } from "@/lib/products";
import AllProducts from "@/components/products/AllProducts";


export default async function Home() {


  const products = await getProducts();


  return (

    <>


      <Hero />

      <AllProducts products={products} />



    </>

  );
}