import type {CSSProperties} from 'react';

type ProductScreenshotProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  priority?: boolean;
};

export default function ProductScreenshot({
  src,
  alt,
  width,
  height,
  caption,
  priority = false,
}: ProductScreenshotProps) {
  const imageStyle: CSSProperties = {aspectRatio: `${width} / ${height}`};

  return (
    <figure className="productScreenshot">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={imageStyle}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
