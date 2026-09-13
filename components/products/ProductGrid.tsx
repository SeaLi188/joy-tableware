import ProductCard from "./ProductCard";
import type { Product } from "@/types/product";

export default function ProductGrid({
  products,
  catalogue = false,
  returnTo,
}: {
  products: Product[];
  catalogue?: boolean;
  returnTo?: string;
}) {
  if (!products.length) {
    return (
      <div className="border border-black/10 bg-ivory px-6 py-20 text-center">
        <p className="font-serif text-3xl">No matching collections</p>
        <p className="mt-3 text-sm text-muted">Try another category or search term.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          catalogue={catalogue}
          returnTo={returnTo}
        />
      ))}
    </div>
  );
}
