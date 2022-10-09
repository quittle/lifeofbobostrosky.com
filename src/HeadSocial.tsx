import React from "react";

export const DESCRIPTION =
  "A dedication to the life of Robert Ostrosky. 1929 – 2022";

export const TITLE = "Life of Bob Ostrosky";

const IMAGE_ALT_TEXT =
  "Black-and-white photo of Robert Ostrosky in February 1967";

export default function HeadSocial(_props: Record<string, never>) {
  return (
    <>
      <meta content={TITLE} property="og:title" />
      <meta content="website" property="og:type" />
      <meta
        content={`https://lifeofbobostrosky.com${"/src/images/social-small.png"}`}
        property="og:image"
      />
      <meta content="https://lifeofbobostrosky.com" property="og:url" />
      <meta content="summary_large_image" name="twitter:card" />

      <meta content={DESCRIPTION} property="og:description" />
      <meta content={TITLE} property="og:site_name" />
      <meta content={IMAGE_ALT_TEXT} name="twitter:image:alt" />
      <meta content={IMAGE_ALT_TEXT} name="og:image:alt" />
    </>
  );
}
