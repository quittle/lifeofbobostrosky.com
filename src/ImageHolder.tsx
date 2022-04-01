import React from "react";

export default function ImageHolder({
  img,
  alt,
  children,
}: React.PropsWithChildren<{ img: string; alt?: string }>) {
  return (
    <div>
      <img alt={alt ?? "unknown"} src={img} />

      <div>{children}</div>
    </div>
  );
}
