import type { Product } from "@/types/product";

function ValueList({ values }: { values: string[] }) {
  return values.length ? <>{values.join(" · ")}</> : <>Available on request</>;
}

export default function ProductSpecifications({ product }: { product: Product }) {
  const sizeText = product.sizes.map((size) =>
    [size.name, size.value, size.dimensions].filter(Boolean).join(" — "),
  );

  const sourceItemNos = Array.isArray(product.sourceItemNo)
    ? product.sourceItemNo
    : product.sourceItemNo
      ? [product.sourceItemNo]
      : [];
  const cutleryRows = product.categorySlug === "cutlery"
    ? [
        ["Catalogue Item No.", <ValueList key="source-item" values={sourceItemNos} />],
        ["Available Finishes", <ValueList key="finishes" values={product.finishes ?? []} />],
        ["Available Pieces", <ValueList key="pieces" values={product.availablePieces ?? []} />],
        ...(product.setComposition?.length
          ? [["Set Options", <ValueList key="sets" values={product.setComposition} />]]
          : []),
      ]
    : [];

  const rows = [
    ["Product Reference", product.id],
    ["Material", product.material || "Available on request"],
    ...cutleryRows,
    ["Available Sizes", <ValueList key="sizes" values={sizeText} />],
    ["Available Colors", <ValueList key="colors" values={product.colors} />],
    ["Applications", <ValueList key="applications" values={product.applications} />],
  ];

  return (
    <dl className="grid border-l border-t border-black/10 text-sm sm:grid-cols-2">
      {rows.map(([label, value]) => (
        <div className="border-b border-r border-black/10 p-5 sm:p-6" key={String(label)}>
          <dt className="eyebrow">{label}</dt>
          <dd className="mt-3 leading-6">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
