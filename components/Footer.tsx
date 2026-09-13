import Link from "next/link";
import { productCategories } from "@/types/product";

export default function Footer() {
  return (
    <footer className="bg-ink py-16 text-white">
      <div className="container-site grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-serif text-xl tracking-[.12em]">JOY TABLEWARE</p>
          <p className="mt-5 max-w-xs text-sm leading-6 text-white/60">
            Premium tableware for weddings, events and hospitality.
          </p>
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-[.18em] text-gold">Products</h3>
          {productCategories.map((category) => (
            <Link
              className="mt-4 block text-sm text-white/65 hover:text-white"
              href={`/products?category=${category.slug}`}
              key={category.slug}
            >
              {category.label}
            </Link>
          ))}
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-[.18em] text-gold">Company</h3>
          {[
            ["About Us", "/about"],
            ["Customization", "/customization"],
            ["Contact", "/contact"],
            ["Privacy Policy", "/privacy"],
          ].map(([label, href]) => (
            <Link className="mt-4 block text-sm text-white/65 hover:text-white" href={href} key={label}>
              {label}
            </Link>
          ))}
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-[.18em] text-gold">Contact</h3>
          <p className="mt-4 text-sm leading-6 text-white/65">
            Shanxi Xingyi International Trade Co., Ltd.
            <br />China
          </p>
          <div className="mt-5 flex gap-5 text-sm">
            <Link href="/contact">Email</Link>
            <Link href="/contact">WhatsApp</Link>
            <a href="https://cnjoytableware88.m.en.alibaba.com/" target="_blank" rel="noreferrer">
              Alibaba
            </a>
          </div>
        </div>
      </div>
      <div className="container-site mt-14 border-t border-white/10 pt-7 text-xs text-white/40">
        © 2026 JOY TABLEWARE. All Rights Reserved.
      </div>
    </footer>
  );
}
