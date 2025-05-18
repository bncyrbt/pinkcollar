"use client";
import Image from "next/image";
import * as React from "react";
import { Button } from "../ui/button";

type ImagePreviewerProps = {
  images: string[];
  onAddImage?: () => void;
};

export const ImagePreviewer = ({ images, onAddImage }: ImagePreviewerProps) => {
  const mainImage = images[0];
  const secondaryImages = images.slice(1, 3);
  const canAddMore = !!onAddImage;

  return (
    <div className="flex flex-col gap-2 w-full max-w-md">
      <div className="border border-black relative w-full aspect-[4/5] overflow-hidden bg-gray-200">
        {mainImage ? (
          <Image
            src={mainImage}
            alt="main preview"
            fill
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="flex gap-2">
        {secondaryImages.map((src, i) => (
          <div
            key={i}
            className="border border-black relative aspect-square w-1/3 overflow-hidden bg-gray-100"
          >
            <Image src={src} alt="img" fill className="object-cover" />
          </div>
        ))}

        {canAddMore && (
          <Button
            type="button"
            onClick={onAddImage}
            className="w-1/3 h-full aspect-square border border-dashed rounded-md flex items-center justify-center text-xl font-bold text-gray-500"
          >
            +
          </Button>
        )}
      </div>
    </div>
  );
};
