import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getCoverImage } from "@/data/products";
import { classifyProductImage } from "@/lib/product-image-classification";
import {
  getCardDescription,
  getCollectionName,
  getCustomizationSummary,
  getSizeSummary,
} from "@/lib/product-presentation";
import type { Product } from "@/types/product";

export default function ProductCard({
  product,
  catalogue = false,
  returnTo,
}: {
  product: Product;
  catalogue?: boolean;
  returnTo?: string;
}) {
  const cover = getCoverImage(product);
  const productHref = `/products/${product.slug}${returnTo ? `?from=${encodeURIComponent(returnTo)}` : ""}`;
  const coverFitClass =
    classifyProductImage(cover) === "application"
      ? "object-cover"
      : "object-contain p-4 sm:p-6";

  if (catalogue) {
    return (
      <article className="group flex h-full flex-col border border-black/10 bg-white">
        <Link href={productHref} className="image-zoom block">
          <div className="relative aspect-[4/5] overflow-hidden bg-[#faf8f3]">
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              quality={85}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`h-full w-full ${coverFitClass}`}
            />
            <span className="absolute left-5 top-5 bg-white/90 px-3 py-2 text-[10px] tracking-[.14em] text-ink backdrop-blur-sm">
              {product.id}
            </span>
          </div>
        </Link>

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <p className="eyebrow">Ceramic Plate</p>
          <h3 className="mt-3 font-serif text-3xl leading-tight">{getCollectionName(product)}</h3>
          <p className="mt-4 text-sm leading-6 text-muted">{getCardDescription(product)}</p>

          <dl className="mt-6 divide-y divide-black/10 border-y border-black/10 text-xs">
            <div className="grid grid-cols-[110px_1fr] gap-3 py-3">
              <dt className="text-muted">Material</dt>
              <dd className="leading-5">{product.material || "Available on request"}</dd>
            </div>
            <div className="grid grid-cols-[110px_1fr] gap-3 py-3">
              <dt className="text-muted">Sizes</dt>
              <dd className="leading-5">{getSizeSummary(product)}</dd>
            </div>
            <div className="grid grid-cols-[110px_1fr] gap-3 py-3">
              <dt className="text-muted">OEM / Customization</dt>
              <dd className="leading-5">{getCustomizationSummary(product)}</dd>
            </div>
          </dl>

          <Link
            href={productHref}
            className="mt-6 inline-flex items-center justify-between border-t border-ink pt-4 text-[11px] font-semibold uppercase tracking-[.14em]"
          >
            View Collection
            <ArrowUpRight size={16} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </article>
    );
  }

  return (
    <Link href={productHref} className="image-zoom group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#faf8f3]">
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          quality={85}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`h-full w-full ${coverFitClass}`}
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/25 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
        <span className="absolute bottom-5 right-5 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-white opacity-0 shadow-sm transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={17} />
        </span>
      </div>
      <div className="pt-5">
        <div className="flex items-center justify-between gap-4">
          <p className="eyebrow">{product.category}</p>
          <p className="text-[10px] tracking-[.14em] text-muted">{product.id}</p>
        </div>
        <h3 className="mt-3 font-serif text-2xl leading-tight transition group-hover:text-gold">
          {product.categorySlug === "ceramic-plate" ? getCollectionName(product) : product.name}
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted">{product.subtitle}</p>
      </div>
    </Link>
  );
}
