import React from "react";

export default function Head(_props: Record<string, never>) {
  return (
    <head>
      <meta charSet="utf-8" />

      <title>Robert Ostrosky</title>

      <meta
        content="A dedication to the life of Robert Ostrosky. 1928–2022"
        name="description"
      />

      <link href="https://fonts.googleapis.com" rel="preconnect" />
      <link
        crossOrigin="crossOrigin"
        href="https://fonts.gstatic.com"
        rel="preconnect"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&family=Send+Flowers&display=swap"
        rel="stylesheet"
      />

      <script async defer src="https://www.google.com/recaptcha/api.js" />
    </head>
  );
}
