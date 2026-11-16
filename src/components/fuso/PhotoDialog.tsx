"use client";

import Image from "next/image";
import type { RefObject } from "react";
import { FUSO_IMAGES, fuso, type FusoPhotoKey } from "@/content/fuso";

type Props = {
  dialogRef: RefObject<HTMLDialogElement | null>;
  onClose: () => Promise<void>;
  photo: FusoPhotoKey;
};

/** Ampliación de una foto de la galería; cierra con el botón, Esc o el backdrop. */
export function PhotoDialog({ dialogRef, onClose, photo }: Props) {
  const current = fuso.gallery.photos.find((item) => item.key === photo) ?? fuso.gallery.photos[0];
  return (
    <dialog ref={dialogRef} className="fu-modal fu-lightbox" aria-labelledby="fuso-photo-caption">
      <button type="button" className="fu-modal-close" aria-label="Cerrar fotografía" autoFocus onClick={() => void onClose()}>
        ×
      </button>
      <Image
        key={current.key}
        src={`${FUSO_IMAGES}/${current.image}`}
        width={1536}
        height={1024}
        alt={current.alt}
        sizes="(max-width: 1240px) 95vw, 1160px"
      />
      <p id="fuso-photo-caption">{current.caption}</p>
    </dialog>
  );
}
