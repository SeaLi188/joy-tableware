import Link from "next/link";
import { Check } from "lucide-react";
import type { ProductCustomization as ProductCustomizationData } from "@/types/product";

export default function ProductCustomization({
  customization,
  productId,
}: {
  customization: ProductCustomizationData;
  productId: string;
}) {
  return (
    <section className="bg-ink p-8 text-white sm:p-12 lg:p-16">
      <p className="eyebrow !text-white/55">OEM &amp; Customization</p>
      <h2 className="mt-4 font-serif text-4xl md:text-5xl">Built for your market</h2>
      <p className="mt-4 text-sm leading-6 text-white/65">
        {customization.available
          ? customization.notes ?? "Custom specifications are available for qualified wholesale projects."
          : "Share your target market, order volume and project requirements with our team. Custom specifications are reviewed collection by collection."}
      </p>
      {!!customization.options.length && (
        <ul className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
          {customization.options.map((option) => (
            <li key={option} className="flex items-center gap-3">
              <Check size={15} className="text-gold" />
              {option}
            </li>
          ))}
        </ul>
      )}
      <Link href={`/contact?product=${encodeURIComponent(productId)}`} className="btn btn-light mt-8">
        Discuss This Collection
      </Link>
    </section>
  );
}
