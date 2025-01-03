import BlackFridayBanner from "@/components/BlackFridayBanner";
import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  // console.log(
  //   crypto.randomUUID().slice(0, 5)+ ` >>> Rendered the home page cache with ${products.length} products and ${categories.length} categories`
  // );
  return (
    <div className="">
      <h1>Home</h1>
      {/* banners section */}
      <BlackFridayBanner />
      {/* render products section */}
      <div>
        <ProductsView products={products} categories={categories}/>
      </div>
    </div>
  );
}
