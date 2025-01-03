import imageUrl  from "@/lib/imageUrl";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { SanityImageObject } from "@sanity/image-url/lib/types/types";
import { PortableText, PortableTextComponents } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";

async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
console.log(product)
  if (!product) {
    return notFound();
  }

  const isOutOfStock = product.stock != null && product.stock <= 0;
  const myPortableTextComponents: PortableTextComponents = {
    types: {
      image: ({ value}: { value: SanityImageObject; }) => (
        
        <div >
          <Image
            src={imageUrl(value).url()}
            alt={product.name || "Product Image"}
            width={800}
            height={800}
            style={{ objectFit: "contain" }}
          />
        </div>
      ),
    },
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          className={`relative aspect-square overflow-hidden rounded-lg shadow-lg ${isOutOfStock ? "opacity-50" : ""}`}
        >
         {product.image && (
                    <Image
                        className="object-contain transition-transform duration-300 group-hover:scale-105"
                        alt={product.name || "Product Image"}
                        src={imageUrl(product.image).url()}
                        fill
                        sizes="{max-width:768px} 100vw, (max-width:1200px) 50vw, 33vw"
                    />
                )}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white text-lg font-bold">Out of Stock</span>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="text-xl font-semibold mb-4">
              ${product.price?.toFixed(2)}
            </div>
            <div className="prose max-w-none mb-6">
              {Array.isArray(product.description) && (
                <PortableText value={product.description} components={myPortableTextComponents} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;