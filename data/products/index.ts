import ceramicPlateData from "./ceramic-plate.json";
import cutleryData from "./cutlery.json";
import glassCupData from "./glass-cup.json";
import glassPlateData from "./glass-plate.json";
import {
  productCategories,
  type Product,
  type ProductCategorySlug,
} from "@/types/product";
import { sortProductImagesForPresentation } from "@/lib/product-image-classification";
import { filterProductImagesByQuality } from "@/lib/product-image-quality";

const categoryBySlug = new Map(productCategories.map((category) => [category.slug, category]));
const approvedPublishedSourceConflicts = new Map([
  ["JOY-GC-202305", new Set(["JOY-GC-034", "JOY-GC-035"])],
]);

const catalogueData = [
  ...ceramicPlateData,
  ...glassPlateData,
  ...glassCupData,
  ...cutleryData,
] as Product[];

function validateCatalogue(items: Product[]) {
  const ids = new Set<string>();
  const slugs = new Set<string>();
  const sourceOwners = new Map<string, string>();

  for (const product of items) {
    const category = categoryBySlug.get(product.categorySlug);
    if (!category || product.category !== category.label) {
      throw new Error(`Invalid product category for ${product.slug}`);
    }
    if (!new RegExp(`^${category.idPrefix}-\\d{3}$`).test(product.id)) {
      throw new Error(`Invalid product ID ${product.id}`);
    }
    if (ids.has(product.id) || slugs.has(product.slug)) {
      throw new Error(`Duplicate product ID or slug: ${product.id} / ${product.slug}`);
    }
    if (!product.images.length || !product.images.some((image) => image.role === "cover")) {
      throw new Error(`Product ${product.id} requires a cover image`);
    }
    if ((product.source.pdf === null) !== (product.source.page === null)) {
      throw new Error(`Product ${product.id} has an incomplete PDF source reference`);
    }
    const sourceItemNos = Array.isArray(product.sourceItemNo)
      ? product.sourceItemNo
      : product.sourceItemNo
        ? [product.sourceItemNo]
        : [];
    for (const sourceItemNo of sourceItemNos) {
      const owner = sourceOwners.get(sourceItemNo);
      if (owner && owner !== product.id) {
        const approvedOwners = approvedPublishedSourceConflicts.get(sourceItemNo);
        if (!approvedOwners || !approvedOwners.has(owner) || !approvedOwners.has(product.id)) {
          throw new Error(`Duplicate published source Item No. ${sourceItemNo}: ${owner} / ${product.id}`);
        }
      }
      sourceOwners.set(sourceItemNo, product.id);
    }
    ids.add(product.id);
    slugs.add(product.slug);
  }

  for (const product of items) {
    const variantIds = new Set<string>();
    for (const variant of product.variants ?? []) {
      if (variantIds.has(variant.id)) {
        throw new Error(`Duplicate variant ID ${variant.id} in ${product.id}`);
      }
      if (variant.id !== product.id && ids.has(variant.id)) {
        throw new Error(`Variant ID ${variant.id} is also published as a top-level product`);
      }
      if (!variant.images.length) {
        throw new Error(`Variant ${variant.id} in ${product.id} requires an image`);
      }
      variantIds.add(variant.id);
    }
  }
}

validateCatalogue(catalogueData);

export const products = [...catalogueData].sort(
  (a, b) => (a.sortOrder ?? Number.MAX_SAFE_INTEGER) - (b.sortOrder ?? Number.MAX_SAFE_INTEGER),
);

export const getProduct = (slug: string) => products.find((product) => product.slug === slug);

export const getProductsByCategory = (categorySlug: ProductCategorySlug) =>
  products.filter((product) => product.categorySlug === categorySlug);

export const getProductImagesByPriority = (product: Product) =>
  sortProductImagesForPresentation(
    filterProductImagesByQuality(product.id, product.images),
    "detail",
  );

export const getCoverImage = (product: Product) =>
  sortProductImagesForPresentation(
    filterProductImagesByQuality(product.id, product.images),
    "catalogue",
  )[0];

export { productCategories } from "@/types/product";
export type { Product, ProductCategory, ProductCategorySlug } from "@/types/product";
