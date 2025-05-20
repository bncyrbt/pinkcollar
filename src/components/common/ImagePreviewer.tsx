"use client";
import Image from "next/image";
import * as React from "react";
import { Button } from "../ui/button";

type ImagePreviewerProps = {
  images: string[];
  editable: boolean;
  onAddImage: (file: File) => void;
  onRemoveImage: (url: string) => void;
};

export const ImagePreviewer = ({
  images,
  editable,
  onAddImage,
  onRemoveImage,
}: ImagePreviewerProps) => {
  const mainImage = images[0];
  const secondaryImages = images.slice(1);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onAddImage) {
      onAddImage(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-md">
      {/* Main image */}
      <div className=" border border-black relative w-full aspect-[4/5] overflow-hidden bg-gray-200">
        {mainImage ? (
          <>
            {editable && (
              <Button
                onClick={() => onRemoveImage(mainImage)}
                variant="tag"
                type="button"
                className="absolute top-1 left-1 z-10"
              >
                -
              </Button>
            )}
            <Image
              src={mainImage}
              alt="main preview"
              fill
              className="object-cover"
            />
          </>
        ) : null}
      </div>

      {/* Secondary images */}
      <div className="flex flex-wrap gap-2">
        {secondaryImages.map((src, i) => (
          <div
            key={i}
            className="relative border border-black aspect-square w-1/3 overflow-hidden bg-gray-100"
          >
            {editable && (
              <Button
                onClick={() => onRemoveImage(src)}
                variant="tag"
                type="button"
                className="absolute top-1 left-1 z-10"
              >
                -
              </Button>
            )}
            <Image
              src={src}
              alt={`preview ${i + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}

        {editable && (
          <>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleClick}
              className="w-1/3 aspect-square border border-dashed rounded-md flex items-center justify-center text-xl font-bold text-gray-500"
            >
              +
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
