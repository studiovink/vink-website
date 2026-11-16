"use client";

import Image from "next/image";
import { FUSO_IMAGES, fuso } from "@/content/fuso";
import { useFuso } from "./FusoExperience";

export function GalleryGrid() {
  const { openPhoto } = useFuso();
  return (
    <div className="fu-gallery-grid">
      {fuso.gallery.photos.map((photo) => (
        <button
          key={photo.key}
          type="button"
          className="fu-gallery-item fu-reveal"
          aria-label={photo.label}
          aria-haspopup="dialog"
          onClick={(event) => openPhoto(photo.key, event.currentTarget)}
        >
          <Image
            src={`${FUSO_IMAGES}/${photo.image}`}
            width={1536}
            height={1024}
            alt={photo.alt}
            sizes="(max-width: 760px) 45vw, 400px"
          />
        </button>
      ))}
    </div>
  );
}
