import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { notFound } from "next/navigation";
import ProductBackLink from "@/components/products/ProductBackLink";
import ProductCustomization from "@/components/products/ProductCustomization";
import ProductGallery from "@/components/products/ProductGallery";
import ProductGlassTypes from "@/components/products/ProductGlassTypes";
import ProductGrid from "@/components/products/ProductGrid";
import ProductSpecifications from "@/components/products/ProductSpecifications";
import ProductVariants from "@/components/products/ProductVariants";
import { getProduct, getProductImagesByPriority, products } from "@/data/products";
import {
  getBuyerDescription,
  getCollectionFeatures,
  getCollectionName,
} from "@/lib/product-presentation";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const product = getProduct((await params).slug);
  return {
    title: product ? getCollectionName(product) : "Product Collection",
    description: product ? getBuyerDescription(product) : undefined,
    alternates: product ? { canonical: `/products/${product.slug}` } : undefined,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const collectionName = getCollectionName(product);
  const collectionFeatures = getCollectionFeatures(product);

  const relatedProducts = [
    ...products.filter(
      (candidate) =>
        candidate.slug !== product.slug && candidate.categorySlug === product.categorySlug,
    ),
    ...products.filter(
      (candidate) =>
        candidate.slug !== product.slug && candidate.categorySlug !== product.categorySlug,
    ),
  ].slice(0, 3);

  return (
    <>
      <section className="container-site pb-20 pt-32 md:pt-36">
        <ProductBackLink
          category={product.category}
          fallbackHref={`/products?category=${product.categorySlug}`}
        />

        <div className="grid gap-12 lg:grid-cols-[1.08fr_.92fr] lg:gap-20">
          <ProductGallery images={getProductImagesByPriority(product)} name={product.name} />

          <div className="self-start lg:sticky lg:top-28">
            <p className="eyebrow mb-6 text-gold">Product Overview</p>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="eyebrow">{product.category}</p>
              <p className="text-xs tracking-[.14em] text-muted">{product.id}</p>
            </div>
            <h1 className="display mt-5 text-5xl sm:text-6xl md:text-7xl">{collectionName}</h1>
            <p className="mt-5 font-serif text-xl text-muted">{product.subtitle}</p>
            <p className="mt-6 leading-7 text-muted">{getBuyerDescription(product)}</p>

          </div>
        </div>
      </section>

      <section className="border-y border-black/10 py-16 md:py-20">
        <div className="container-site">
          <p className="eyebrow">B2B Sourcing Advantages</p>
          <h2 className="display mt-4 text-5xl md:text-6xl">Collection Features</h2>
          <ul className="mt-10 grid border-l border-t border-black/10 sm:grid-cols-2 lg:grid-cols-4">
            {collectionFeatures.map((feature, index) => (
              <li
                key={feature}
                className="flex min-h-40 flex-col justify-between border-b border-r border-black/10 p-6"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/50 text-gold">
                  <Check size={14} />
                </span>
                <div>
                  <span className="text-[10px] tracking-[.16em] text-muted">0{index + 1}</span>
                  <p className="mt-2 font-serif text-xl leading-snug">{feature}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-black/10 bg-ivory py-20 md:py-24">
        <div className="container-site">
          <p className="eyebrow">Technical Information</p>
          <div className="mb-10 mt-4 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h2 className="display text-5xl md:text-6xl">Specifications</h2>
            <p className="max-w-md text-sm leading-6 text-muted">
              Core catalogue information for sourcing review. Final specifications are confirmed with your quotation.
            </p>
          </div>
          <ProductSpecifications product={product} />
        </div>
      </section>

      <ProductGlassTypes glassTypes={product.glassTypes ?? []} />

      {!!product.variants?.length && <ProductVariants variants={product.variants} />}

      <section className="container-site py-20 md:py-24">
        <ProductCustomization customization={product.customization} productId={product.id} />
      </section>

      <section className="border-y border-black/10 bg-sand py-20 md:py-24">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="eyebrow">Project Enquiry · {product.id}</p>
            <h2 className="display mt-5 max-w-3xl text-5xl md:text-6xl">
              Request a Quote for the {collectionName}
            </h2>
            <p className="mt-6 max-w-2xl leading-7 text-muted">
              Tell us your required quantities, destination market, size mix and customization needs. Our B2B team will prepare a project-specific quotation.
            </p>
          </div>
          <Link href={`/contact?product=${encodeURIComponent(product.id)}`} className="btn btn-dark">
            Request a Quote <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {!!relatedProducts.length && (
        <section className="section border-t border-black/10">
          <div className="container-site">
            <p className="eyebrow">Continue exploring</p>
            <h2 className="display mb-12 mt-4 text-5xl md:text-6xl">Related Collections</h2>
            <ProductGrid products={relatedProducts} />
          </div>
        </section>
      )}

    </>
  );
}
