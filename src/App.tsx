import { JssContext, jss } from "react-jss";
import { argyleBackground, headerFontFamily, lightText } from "./styles";

import Head from "./Head";
import { JssStyle } from "jss";
import Main from "./Main";
import React from "react";
import Updates from "./Updates";

const headerCommon: JssStyle = {
  ...headerFontFamily,
};

const inputCommon: JssStyle = {
  fontSize: "1em",
  padding: "0.5em",
};

const styleSheet = jss.createStyleSheet({
  "@global": {
    "*": {
      boxSizing: "border-box",
    },
    html: {
      width: "100%",
      height: "100%",
      margin: 0,
      fontSize: 20,
    },
    body: {
      width: "100%",
      height: "100%",
      margin: 0,
      overflowX: "clip",
      ...lightText,
    },
    h1: headerCommon,
    h2: headerCommon,
    h3: headerCommon,
    h4: headerCommon,
    h5: headerCommon,
    h6: headerCommon,
    section: {
      ...argyleBackground,
      display: "inline-block",
      width: "100%",
      padding: "1em",
    },
    input: inputCommon,
    textarea: inputCommon,
  },
});

export default function App(_props: Record<string, never>) {
  const jssContext = React.useContext(JssContext);
  jssContext!.registry!.add(styleSheet);

  return (
    <html>
      <Head />
      <body>
        <Main />
        <Updates />
      </body>
    </html>
  );
}
