"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

function getSafeReturnUrl(value: string | null, fallbackHref: string) {
  if (!value) return fallbackHref;

  try {
    const candidate = new URL(value, window.location.origin);
    if (candidate.origin !== window.location.origin || candidate.pathname !== "/products") {
      return fallbackHref;
    }
    return `${candidate.pathname}${candidate.search}`;
  } catch {
    return fallbackHref;
  }
}

export default function ProductBackLink({
  category,
  fallbackHref,
}: {
  category: string;
  fallbackHref: string;
}) {
  const [href, setHref] = useState(fallbackHref);

  useEffect(() => {
    const from = new URLSearchParams(window.location.search).get("from");
    setHref(getSafeReturnUrl(from, fallbackHref));
  }, [fallbackHref]);

  return (
    <Link
      href={href}
      className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[.14em] text-muted transition hover:text-ink"
    >
      <ArrowLeft size={14} /> Back to {category}
    </Link>
  );
}
