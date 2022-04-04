import React from "react";

export default function Picture({
  classes,
  src,
  alt,
  widths,
}: {
  classes?: string;
  alt: string;
  src: string;
  widths: ReadonlyArray<number>;
}) {
  return (
    <img
      alt={alt}
      className={classes}
      sizes="100vw"
      src={src}
      srcSet={widths
        .map((width) => `${src}?width=${width} ${width}w`)
        .join(", ")}
    />
  );
}
