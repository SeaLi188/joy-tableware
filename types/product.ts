export const productCategories = [
  { slug: "ceramic-plate", label: "Ceramic Plate", idPrefix: "JOY-CP" },
  { slug: "glass-plate", label: "Glass Plate", idPrefix: "JOY-GP" },
  { slug: "glass-cup", label: "Glass Cup", idPrefix: "JOY-GC" },
  { slug: "cutlery", label: "Cutlery", idPrefix: "JOY-CU" },
] as const;

export type ProductCategorySlug = (typeof productCategories)[number]["slug"];
export type ProductCategory = (typeof productCategories)[number]["label"];
export type ProductImageRole = "cover" | "detail" | "color" | "application";

export interface ProductImage {
  src: string;
  alt: string;
  role: ProductImageRole;
}

export interface ProductSize {
  name: string;
  value: string;
  dimensions?: string;
}

export interface ProductCustomization {
  available: boolean | null;
  options: string[];
  notes?: string;
}

export interface ProductSource {
  pdf: string | null;
  page: number | number[] | null;
}

export interface ProductVariant {
  id: string;
  name: string;
  sourceItemNo?: string | string[];
  material?: string;
  finishes?: string[];
  availablePieces?: string[];
  setComposition?: string[];
  sizes?: ProductSize[];
  colors?: string[];
  customization?: ProductCustomization;
  images: ProductImage[];
  source: ProductSource;
}

export interface Product {
  id: string;
  sourceItemNo?: string | string[];
  originalName?: string;
  displayName?: string;
  slug: string;
  name: string;
  category: ProductCategory;
  categorySlug: ProductCategorySlug;
  subtitle: string;
  description: string;
  features: string[];
  images: ProductImage[];
  material: string;
  finishes?: string[];
  availablePieces?: string[];
  setComposition?: string[];
  sizes: ProductSize[];
  glassTypes?: string[];
  colors: string[];
  applications: string[];
  customization: ProductCustomization;
  moq?: string;
  packaging?: string;
  source: ProductSource;
  variants?: ProductVariant[];
  featured?: boolean;
  sortOrder?: number;
}
