import Image from 'next/image';
import { FC } from 'react';

interface Props {
  /** Describe the link target when the logo is a link; empty when decorative. */
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

// public/images/logo.webp is the raster that used to be base64-embedded in an
// inline SVG (66 KB of markup, rendered three times per page).
export const Logo: FC<Props> = ({
  alt = '',
  width = 85,
  height = 60,
  className,
}) => (
  <Image
    src="/images/logo.webp"
    alt={alt}
    width={width}
    height={height}
    className={className}
  />
);
