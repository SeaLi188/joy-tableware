import Image from "next/image";
import type { ProductVariant } from "@/types/product";

function referenceText(sourceItemNo: ProductVariant["sourceItemNo"]) {
  if (!sourceItemNo) return "Catalogue reference on request";
  return Array.isArray(sourceItemNo) ? sourceItemNo.join(" · ") : sourceItemNo;
}

function pageText(page: ProductVariant["source"]["page"]) {
  if (page === null) return "";
  return `PDF page ${Array.isArray(page) ? page.join(" · ") : page}`;
}

export default function ProductVariants({ variants }: { variants: ProductVariant[] }) {
  if (!variants.length) return null;

  return (
    <section className="border-y border-black/10 py-16 md:py-20">
      <div className="container-site">
        <p className="eyebrow">Catalogue Structure</p>
        <div className="mt-4 grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(18rem,32rem)] md:items-end">
          <h2 className="display text-5xl md:text-6xl">Collection Variants</h2>
          <p className="text-sm leading-6 text-muted">
            Source styles are grouped within this master collection for B2B range planning. Each original catalogue reference remains traceable.
          </p>
        </div>

        <ul className="mt-10 grid gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-3">
          {variants.map((variant) => {
            const image = variant.images[0];
            return (
              <li className="min-w-0 bg-paper p-5" key={variant.id}>
                {image && (
                  <div className="relative aspect-[4/3] overflow-hidden bg-sand">
                    <Image
                      src={image.src}
                      alt={image.alt || variant.name}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="mt-5 flex min-w-0 items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-serif text-xl leading-snug">{variant.name}</h3>
                    <p className="mt-2 break-words text-xs tracking-[.08em] text-muted">
                      {referenceText(variant.sourceItemNo)}
                    </p>
                  </div>
                  <span className="shrink-0 text-[10px] tracking-[.12em] text-muted">{variant.id}</span>
                </div>
                {pageText(variant.source.page) && (
                  <p className="mt-4 border-t border-black/10 pt-4 text-[10px] uppercase tracking-[.12em] text-muted">
                    {pageText(variant.source.page)}
                  </p>
                )}
                {!!variant.finishes?.length && (
                  <p className="mt-4 text-xs leading-5 text-muted">
                    <span className="font-medium text-ink">Finishes:</span> {variant.finishes.join(" · ")}
                  </p>
                )}
                {!!variant.availablePieces?.length && (
                  <p className="mt-2 text-xs leading-5 text-muted">
                    <span className="font-medium text-ink">Available pieces:</span>{" "}
                    {variant.availablePieces.join(" · ")}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
