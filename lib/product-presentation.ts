import type { Product } from "@/types/product";

export function getCollectionName(product: Product) {
  const baseName = product.displayName || product.name;
  if (product.categorySlug !== "ceramic-plate") return baseName;
  return /\bcollection$/i.test(baseName) ? baseName : `${baseName} Collection`;
}

export function getBuyerDescription(product: Product) {
  const applications = product.applications.map((application) => application.toLowerCase());
  const buyerGroups = [
    applications.some((application) => application.includes("wedding") || application.includes("event"))
      ? "wedding and event rental inventories"
      : null,
    applications.some((application) => application.includes("hotel") || application.includes("hospitality"))
      ? "hospitality purchasing programs"
      : null,
    "restaurant table settings",
    "wholesale distribution",
  ].filter(Boolean);

  const sourcingContext = `Suited to ${buyerGroups.join(", ")}.`;
  return product.description ? `${product.description} ${sourcingContext}` : sourcingContext;
}

export function getCardDescription(product: Product) {
  const programmeDescription =
    "Developed for coordinated hospitality, event-rental and wholesale tableware programs.";
  return product.subtitle ? `${product.subtitle}. ${programmeDescription}` : programmeDescription;
}

export function getSizeSummary(product: Product) {
  if (!product.sizes.length) return "Sizes available on request";
  return product.sizes.map((size) => size.value).join(" · ");
}

export function getCustomizationSummary(product: Product) {
  if (product.customization.available) {
    return product.customization.options.length
      ? `${product.customization.options.join(" & ")} customization available`
      : "Customization available";
  }
  if (product.customization.available === false) return "Standard catalogue specification";
  return "Customization reviewed by project";
}

export function getCollectionFeatures(product: Product) {
  const applications = product.applications.map((application) => application.toLowerCase());
  const supportsRental = applications.some(
    (application) => application.includes("wedding") || application.includes("event"),
  );
  const supportsHospitality = applications.some(
    (application) =>
      application.includes("hotel") ||
      application.includes("hospitality") ||
      application.includes("restaurant") ||
      application.includes("banquet"),
  );

  return [
    product.sizes.length > 1
      ? "Coordinated multi-size collection"
      : "Size configuration confirmed by project",
    supportsRental
      ? "Suitable for wedding and event rental programs"
      : "Suitable for professional tableware programs",
    supportsHospitality
      ? "Hospitality and restaurant project applications"
      : "Commercial sourcing applications",
    product.customization.available
      ? "OEM customization available"
      : product.customization.available === false
        ? "Standard catalogue specification"
        : "OEM requirements reviewed by project",
  ];
}
