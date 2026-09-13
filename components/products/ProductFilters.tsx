import Link from "next/link";
import { Search } from "lucide-react";
import { productCategories, type ProductCategorySlug } from "@/types/product";

export default function ProductFilters({
  activeCategory,
  query,
  counts,
  total,
}: {
  activeCategory?: ProductCategorySlug;
  query: string;
  counts: Record<ProductCategorySlug, number>;
  total: number;
}) {
  return (
    <div className="mb-12 border-y border-black/10 py-6">
      <div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
        <nav aria-label="Product categories" className="flex flex-wrap gap-2">
          <Link
            href={query ? `/products?q=${encodeURIComponent(query)}` : "/products"}
            className={`border px-4 py-3 text-[11px] uppercase tracking-[.13em] transition ${
              !activeCategory ? "border-ink bg-ink text-white" : "border-black/15 hover:border-black/50"
            }`}
          >
            All <span className="ml-1 opacity-55">{total}</span>
          </Link>
          {productCategories.map((category) => {
            const href = `/products?category=${category.slug}${query ? `&q=${encodeURIComponent(query)}` : ""}`;
            return (
              <Link
                key={category.slug}
                href={href}
                className={`border px-4 py-3 text-[11px] uppercase tracking-[.13em] transition ${
                  activeCategory === category.slug
                    ? "border-ink bg-ink text-white"
                    : "border-black/15 hover:border-black/50"
                }`}
              >
                {category.label} <span className="ml-1 opacity-55">{counts[category.slug]}</span>
              </Link>
            );
          })}
        </nav>
        <form action="/products" className="flex min-w-0 border-b border-black/30 xl:w-72">
          {activeCategory && <input type="hidden" name="category" value={activeCategory} />}
          <Search size={16} className="mt-3 shrink-0 text-muted" />
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search collections"
            aria-label="Search product collections"
            className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-muted/70"
          />
          <button type="submit" className="text-[10px] uppercase tracking-[.14em]">
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
