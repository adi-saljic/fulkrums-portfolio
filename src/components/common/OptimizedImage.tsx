"use client";
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
}

/**
 * OptimizedImage component with automatic error handling and fallback support
 * Wraps Next.js Image component to provide graceful fallback for broken URLs
 */
export default function OptimizedImage({
  fallbackSrc = '/images/placeholder.jpg',
  ...props
}: OptimizedImageProps) {
  const [error, setError] = useState(false);

  return (
    <Image
      {...props}
      src={error && fallbackSrc ? fallbackSrc : props.src}
      onError={() => setError(true)}
    />
  );
}
