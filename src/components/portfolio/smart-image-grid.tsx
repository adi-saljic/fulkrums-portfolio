"use client";
import React, { useState } from "react";
import Image from "next/image";

interface SmartImageGridProps {
  images: string[];
}

export default function SmartImageGrid({ images }: SmartImageGridProps) {
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [imageDimensions, setImageDimensions] = useState<Map<string, { width: number; height: number }>>(new Map());

  // Get aspect ratio and determine span class
  const getGridSpanClass = (imageUrl: string): string => {
    const dims = imageDimensions.get(imageUrl);
    if (!dims) return 'grid-span-1'; // Default

    const aspectRatio = dims.width / dims.height;

    if (aspectRatio > 2.5) return 'grid-span-3'; // Banner (full-width)
    if (aspectRatio > 1.3) return 'grid-span-2'; // Landscape
    return 'grid-span-1'; // Portrait/Square
  };

  // Handle image load to get dimensions
  const handleImageLoad = (imageUrl: string, event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    setImageDimensions(prev => new Map(prev).set(imageUrl, {
      width: img.naturalWidth,
      height: img.naturalHeight
    }));
  };

  return (
    <>
      <div className="smart-image-grid">
        {images.map((img, index) => (
          <div
            key={index}
            className={`smart-grid-item ${getGridSpanClass(img)}`}
            onClick={() => setFullscreenImage(img)}
          >
            <Image
              src={img}
              alt={`Portfolio image ${index + 1}`}
              width={800}
              height={800}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                cursor: "pointer"
              }}
              onLoad={(e) => handleImageLoad(img, e)}
              priority={index < 3}
              loading={index < 3 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {fullscreenImage && (
        <div
          onClick={() => setFullscreenImage(null)}
          className="image-fullscreen-modal"
        >
          <button
            onClick={() => setFullscreenImage(null)}
            className="close-btn"
            aria-label="Close fullscreen"
          >
            ×
          </button>
          <Image
            src={fullscreenImage}
            alt="Fullscreen"
            fill
            sizes="100vw"
            style={{ objectFit: "contain" }}
          />
        </div>
      )}
    </>
  );
}
