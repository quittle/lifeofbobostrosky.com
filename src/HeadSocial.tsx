import React from "react";
import { WWW_URL_BASE } from "./domains";
import socialSmall from "./images/social-small.png";

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
        content={(socialSmall as string) + "?domainQualified"}
        property="og:image"
      />
      <meta content={WWW_URL_BASE.toString()} property="og:url" />
      <meta content="summary_large_image" name="twitter:card" />

      <meta content={DESCRIPTION} property="og:description" />
      <meta content={TITLE} property="og:site_name" />
      <meta content={IMAGE_ALT_TEXT} name="twitter:image:alt" />
      <meta content={IMAGE_ALT_TEXT} name="og:image:alt" />
    </>
  );
}
