import imageDisplayPriority from "@/product-import/product-image-display-priority.json";
import type { ProductImage } from "@/types/product";

type ProductImageDisplayRecord = {
  display: string[];
  excluded: Record<string, string[]>;
  replacements?: Record<string, string>;
};

const priorityByProduct = imageDisplayPriority.products as Record<
  string,
  ProductImageDisplayRecord | undefined
>;

/**
 * Applies the generated, presentation-only image audit without changing the
 * catalogue data or deleting source files. A one-image fallback ensures an
 * imperfect catalogue entry can never render an empty gallery.
 */
export function filterProductImagesByQuality(productId: string, images: ProductImage[]) {
  const uniqueImages = images.filter(
    (image, index) => images.findIndex((candidate) => candidate.src === image.src) === index,
  );
  const audit = priorityByProduct[productId];

  if (!audit) return uniqueImages;

  const approvedSources = new Set(audit.display);
  const approvedImages = uniqueImages
    .filter((image) => approvedSources.has(image.src))
    .map((image) => ({
      ...image,
      src: audit.replacements?.[image.src] ?? image.src,
    }));

  return approvedImages.length > 0 ? approvedImages : uniqueImages.slice(0, 1);
}
