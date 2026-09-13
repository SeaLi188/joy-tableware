import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Hotel, Palette, Sparkles } from "lucide-react";
import ProductFilters from "@/components/products/ProductFilters";
import ProductGrid from "@/components/products/ProductGrid";
import { InquiryCTA } from "@/components/ui";
import { productCategories, products } from "@/data/products";
import type { ProductCategorySlug } from "@/types/product";

export const metadata: Metadata = {
  title: "B2B Tableware Catalogue | Ceramic, Glassware & Cutlery",
  description:
    "Explore JOY TABLEWARE ceramic plates, glass plates, glass cups and cutlery for weddings, hotels, hospitality and wholesale programs.",
  alternates: { canonical: "/products" },
};

const catalogueValues = [
  [Sparkles, "Curated Series", "Coordinated tableware collections for professional buyers."],
  [Palette, "OEM Capability", "Colors, finishes, logos and packaging for your market."],
  [Hotel, "Hospitality Ready", "Collections for hotels, restaurants, events and rentals."],
  [Building2, "Wholesale Supply", "Project support for distributors and long-term partners."],
] as const;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const params = await searchParams;
  const activeCategory = productCategories.some((category) => category.slug === params.category)
    ? (params.category as ProductCategorySlug)
    : undefined;
  const query = params.q?.trim() ?? "";
  const normalizedQuery = query.toLocaleLowerCase();
  const queryTerms = normalizedQuery.split(/\s+/).filter(Boolean);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = !activeCategory || product.categorySlug === activeCategory;
    const sourceReferences = Array.isArray(product.sourceItemNo)
      ? product.sourceItemNo
      : product.sourceItemNo
        ? [product.sourceItemNo]
        : [];
    const variantReferences = (product.variants ?? []).flatMap((variant) => {
      const itemNos = Array.isArray(variant.sourceItemNo)
        ? variant.sourceItemNo
        : variant.sourceItemNo
          ? [variant.sourceItemNo]
          : [];
      const variantSizes = (variant.sizes ?? []).flatMap((size) => [
        size.name,
        size.value,
        size.dimensions,
      ]);
      return [
        variant.id,
        variant.name,
        ...itemNos,
        variant.material,
        ...(variant.finishes ?? []),
        ...(variant.availablePieces ?? []),
        ...(variant.setComposition ?? []),
        ...variantSizes,
        ...(variant.colors ?? []),
        ...(variant.customization?.options ?? []),
        variant.customization?.notes,
      ];
    });
    const sizeReferences = product.sizes.flatMap((size) => [
      size.name,
      size.value,
      size.dimensions,
    ]);
    const customizationReferences = [
      product.customization.available === true ? "Customization available OEM available" : "",
      ...product.customization.options,
      product.customization.notes,
    ];
    const searchDocument = [
      product.id,
      product.name,
      product.displayName,
      product.originalName,
      product.subtitle,
      product.description,
      product.category,
      product.material,
      ...sourceReferences,
      ...sizeReferences,
      ...product.features,
      ...(product.glassTypes ?? []),
      ...(product.finishes ?? []),
      ...(product.availablePieces ?? []),
      ...(product.setComposition ?? []),
      ...variantReferences,
      ...product.colors,
      ...product.applications,
      ...customizationReferences,
      product.moq,
      product.packaging,
    ]
      .filter(Boolean)
      .join(" ")
      .toLocaleLowerCase();
    const matchesQuery =
      !queryTerms.length || queryTerms.every((term) => searchDocument.includes(term));
    return matchesCategory && matchesQuery;
  });

  const counts = Object.fromEntries(
    productCategories.map((category) => [
      category.slug,
      products.filter((product) => product.categorySlug === category.slug).length,
    ]),
  ) as Record<ProductCategorySlug, number>;
  const isCeramicCatalogue = activeCategory === "ceramic-plate";
  const returnState = new URLSearchParams();
  if (activeCategory) returnState.set("category", activeCategory);
  if (query) returnState.set("q", query);
  const returnQuery = returnState.toString();
  const returnTo = `/products${returnQuery ? `?${returnQuery}` : ""}`;

  return (
    <>
      <section className="relative overflow-hidden bg-ink pb-24 pt-40 text-white md:pb-32 md:pt-48">
        <div className="absolute inset-0 opacity-[.07] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:64px_64px]" />
        <div className="container-site relative grid gap-14 lg:grid-cols-[1.3fr_.7fr] lg:items-end">
          <div>
            <p className="eyebrow !text-gold">
              {isCeramicCatalogue ? "Ceramic Plate Catalogue" : "JOY TABLEWARE Catalogue"}
            </p>
            <h1 className="display mt-6 max-w-4xl text-6xl sm:text-7xl md:text-[6.5rem]">
              {isCeramicCatalogue
                ? "Ceramic Plate Collections for Professional Tables"
                : "Tableware Collections for Professional Buyers"}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-white/65">
              {isCeramicCatalogue
                ? "A curated porcelain plate catalogue for wedding rental companies, hotels, restaurants and wholesale distributors—supported by coordinated sizes and project-based customization."
                : "A focused supplier catalogue of ceramic plates, glass plates, glass cups and cutlery for weddings, hospitality, rental and wholesale programs."}
            </p>
          </div>
          <div className="border-l border-white/15 pl-7">
            <p className="text-5xl font-light">
              {isCeramicCatalogue ? counts["ceramic-plate"] : "04"}
            </p>
            <p className="mt-2 text-xs uppercase tracking-[.2em] text-white/50">
              {isCeramicCatalogue ? "Approved Collections" : "Core Categories"}
            </p>
            <p className="mt-8 text-sm leading-6 text-white/60">
              {isCeramicCatalogue
                ? "Porcelain collections selected for professional sourcing, repeat rental use and coordinated hospitality projects."
                : "No retail checkout. Every collection is supported by project consultation and B2B quotation."}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-ivory">
        <div className="container-site grid sm:grid-cols-2 lg:grid-cols-4">
          {catalogueValues.map(([Icon, title, text], index) => (
            <div
              key={title}
              className={`px-6 py-10 lg:px-8 ${index > 0 ? "border-t border-black/10 sm:border-l sm:border-t-0" : ""} ${index === 2 ? "sm:border-l-0 lg:border-l" : ""}`}
            >
              <Icon size={22} strokeWidth={1.3} className="text-gold" />
              <h2 className="mt-6 font-serif text-2xl">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container-site">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">{isCeramicCatalogue ? "Professional porcelain" : "Browse the catalogue"}</p>
            <h2 className="display mt-4 text-5xl md:text-6xl">
              {isCeramicCatalogue ? "Ceramic Plate Collections" : "Product Series"}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-muted">
            {isCeramicCatalogue
              ? "Compare coordinated sizes, decorative finishes and customization readiness for your next hospitality, rental or distribution program."
              : "Browse by category or search by collection name, reference number and application."}
          </p>
        </div>

        <ProductFilters
          activeCategory={activeCategory}
          query={query}
          counts={counts}
          total={products.length}
        />

        <div className="mb-8 flex items-center justify-between gap-4 text-sm">
          <p className="text-muted">
            Showing <span className="text-ink">{filteredProducts.length}</span> collection
            {filteredProducts.length === 1 ? "" : "s"}
          </p>
          {(activeCategory || query) && (
            <Link href="/products" className="text-xs uppercase tracking-[.14em] underline underline-offset-4">
              Clear filters
            </Link>
          )}
        </div>

        <ProductGrid
          products={filteredProducts}
          catalogue={isCeramicCatalogue}
          returnTo={returnTo}
        />
      </section>

      <section className="bg-ivory py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <p className="eyebrow">OEM &amp; Private Label</p>
            <h2 className="display mt-5 text-5xl md:text-6xl">A Catalogue Built Around Your Market</h2>
          </div>
          <div>
            <p className="max-w-2xl leading-7 text-muted">
              Select a base collection, then discuss colors, decorative finishes, logos, set
              composition and packaging with our team. We support wedding, hotel, restaurant,
              rental and wholesale programs.
            </p>
            <Link href="/customization" className="btn btn-dark mt-8">
              Explore Customization <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <InquiryCTA />
    </>
  );
}
