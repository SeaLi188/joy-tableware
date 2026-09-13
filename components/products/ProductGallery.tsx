"use client";

import Image from "next/image";
import { useState } from "react";
import { classifyProductImage } from "@/lib/product-image-classification";
import type { ProductImage } from "@/types/product";

const getImageFitClass = (image: ProductImage) =>
  classifyProductImage(image) === "application"
    ? "object-cover"
    : "object-contain p-6 sm:p-8";

const getThumbnailFitClass = (image: ProductImage) =>
  classifyProductImage(image) === "application" ? "object-cover" : "object-contain p-2";

export default function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];

  return (
    <div>
      <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-[#faf8f3]">
        <Image
          src={activeImage.src}
          alt={activeImage.alt || name}
          fill
          priority
          quality={90}
          sizes="(max-width: 1024px) 100vw, 55vw"
          className={getImageFitClass(activeImage)}
        />
      </div>
      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((image, index) => (
            <button
              type="button"
              key={`${image.src}-${index}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`View ${image.role} image ${index + 1} of ${name}`}
              aria-pressed={activeIndex === index}
              className={`relative aspect-square overflow-hidden border bg-[#faf8f3] transition ${
                activeIndex === index ? "border-ink" : "border-transparent hover:border-black/30"
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                quality={85}
                sizes="160px"
                className={getThumbnailFitClass(image)}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
