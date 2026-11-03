'use client';

import Image from 'next/image';
import { useState } from 'react';

const FALLBACK_IMAGE = '/images/product-placeholder.png';

type Props = {
  src: string | null;
  productTitle: string;
  sizes: string;
  className?: string;
  preload?: boolean;
};

export default function ProductImage({
  src,
  productTitle,
  sizes,
  className = 'object-contain',
  preload = false,
}: Props) {
  const source = src || FALLBACK_IMAGE;
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  const imageSrc = failedSrc === source ? FALLBACK_IMAGE : source;
  const isFallback = imageSrc === FALLBACK_IMAGE;
  const isRemoteImage = imageSrc.startsWith('http');

  return (
    <Image
      src={imageSrc}
      alt={
        isFallback
          ? `Geen afbeelding beschikbaar voor ${productTitle}`
          : productTitle
      }
      fill
      sizes={sizes}
      preload={preload}
      unoptimized={isRemoteImage}
      onError={() => {
        if (!isFallback) {
          setFailedSrc(source);
        }
      }}
      className={className}
    />
  );
}
