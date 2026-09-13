import type { ProductImage } from "@/types/product";

export type PresentationImageRole = "application" | "collection" | "product" | "detail";
export type ImagePresentationContext = "catalogue" | "detail";

const applicationPattern =
  /(?:^|[\s/_-])(application|banquet|event|hospitality|hotel|lifestyle|restaurant|scene|setting|styled|table-setting|wedding)(?:[\s/_.-]|$)/i;
const collectionPattern =
  /(?:^|[\s/_-])(arrangement|assorted|collection|complete-set|family|group|multiple|overview|range|series|set|stacked|variant)(?:[\s/_.-]|$)/i;
const productPattern =
  /(?:^|[\s/_-])(individual|product|single)(?:[\s/_.-]|$)/i;
const detailPattern =
  /(?:^|[\s/_-])(close-up|closeup|edge|finish|pattern-detail|rim-detail|texture)(?:[\s/_.-]|$)/i;

const rolePriority: Record<ImagePresentationContext, Record<PresentationImageRole, number>> = {
  catalogue: {
    application: 0,
    collection: 1,
    product: 2,
    detail: 3,
  },
  detail: {
    collection: 0,
    application: 1,
    product: 2,
    detail: 3,
  },
};

const getRecognitionText = (image: ProductImage) => `${image.src} ${image.alt}`.toLowerCase();

export function classifyProductImage(
  image: ProductImage,
  sourceIndex = 0,
): PresentationImageRole {
  const recognitionText = getRecognitionText(image);

  if (image.role === "application" || applicationPattern.test(recognitionText)) {
    return "application";
  }
  if (collectionPattern.test(recognitionText)) return "collection";
  if (productPattern.test(recognitionText)) return "product";
  if (detailPattern.test(recognitionText)) return "detail";

  // The extraction pipeline uses cover for the best complete family view.
  if (image.role === "cover" || /(?:^|\/)cover\.[a-z0-9]+$/i.test(image.src)) {
    return "collection";
  }

  // Color sheets normally present a coordinated family of available variants.
  if (image.role === "color") return "collection";

  // Generic detail-XX assets are usually the separated product views that
  // follow the PDF overview image. Only explicit close-up metadata is treated
  // as a detail image above.
  if (image.role === "detail" || /(?:^|\/)detail-\d+/i.test(image.src)) {
    return "product";
  }

  return sourceIndex === 0 ? "collection" : "detail";
}

export function sortProductImagesForPresentation(
  images: ProductImage[],
  context: ImagePresentationContext,
) {
  return images
    .map((image, sourceIndex) => ({
      image,
      sourceIndex,
      presentationRole: classifyProductImage(image, sourceIndex),
    }))
    .sort(
      (a, b) =>
        rolePriority[context][a.presentationRole] - rolePriority[context][b.presentationRole] ||
        a.sourceIndex - b.sourceIndex,
    )
    .map(({ image }) => image);
}
