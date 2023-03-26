import React from "react";
import { base64Encode } from "./utils";

/**
 * Idea taken from https://css-tricks.com/how-to-safely-share-your-email-address-on-a-website
 * Hides the contents of links from crawlers by resolving the link only at runtime with JS and
 * splitting the text with a bunch of other junk.
 */
export default function SecretLink(props: { href: string; contents: string }) {
  const { href, contents } = props;
  const parts = contents.split("");
  return (
    <a data-encoded-href={base64Encode(href)}>
      {parts.map((char, index) => (
        // Index is part of what's generated
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={`${char}_${index}`}>
          <span aria-hidden style={{ display: "none" }}>
            word {index}
          </span>
          {char}
          {/* eslint-disable-next-line react/no-danger */}
          <span dangerouslySetInnerHTML={{ __html: `<!-- ${index} -->` }} />
        </React.Fragment>
      ))}
    </a>
  );
}
