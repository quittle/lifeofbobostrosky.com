import {
  CssClasses,
  argyleBackground,
  headerFontFamily,
  lightText,
  regularFontFamily,
} from "./styles";
import { JssContext, jss } from "react-jss";
import Body from "./Body";
import Head from "./Head";
import { JssStyle } from "jss";
import React from "react";
import colors from "./colors";

const headerCommon: JssStyle = {
  ...headerFontFamily,
};

const inputCommon: JssStyle = {
  fontSize: "1em",
  padding: "0.5em",
  ...regularFontFamily,
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
      ...regularFontFamily,
    },
    h1: headerCommon,
    h2: headerCommon,
    h3: headerCommon,
    h4: headerCommon,
    h5: headerCommon,
    h6: headerCommon,
    main: {
      ...argyleBackground,
      zIndex: 0,
    },
    section: {
      display: "inline-block",
      width: "100%",
      padding: "1em",
      maxWidth: 1000,
    },
    input: inputCommon,
    textarea: inputCommon,
    button: inputCommon,
    a: {
      color: colors.veryLightBlue,
      "&:visited": {
        color: colors.veryLightPurple,
      },
      [`.${CssClasses.LIGHT_BACKGROUND} &, &.${CssClasses.LIGHT_BACKGROUND}`]: {
        color: colors.darkBlue,
        "&:visited": {
          color: colors.darkPurple,
        },
      },
    },
  },
});

export default function App(_props: Record<string, never>) {
  const jssContext = React.useContext(JssContext);
  jssContext!.registry!.add(styleSheet);

  return (
    <html lang="en">
      <Head />
      <Body />
    </html>
  );
}
