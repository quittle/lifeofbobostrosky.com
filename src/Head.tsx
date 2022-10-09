import HeadSocial, { DESCRIPTION, TITLE } from "./HeadSocial";
import React from "react";
import colors from "./colors";

export default function Head(_props: Record<string, never>) {
  return (
    <head>
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag('js', new Date());

            gtag('config', 'G-TRF0NF58R2');
          `,
        }}
      />
      <meta charSet="utf-8" />

      <title>{TITLE}</title>

      <meta content={DESCRIPTION} name="description" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />

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

      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-TRF0NF58R2"
      />

      <script
        async
        defer
        src="https://www.google.com/recaptcha/api.js?render=6LcT-UEfAAAAALIl7NO1JPZvYuvVxDF6kyzYc1gH"
      />

      <meta content={colors.darkGrey} name="theme-color" />

      <link href="/src/images/favicon-512.png" rel="icon" type="image/png" />

      <HeadSocial />
    </head>
  );
}
