import * as theme from "./styles";
import { JssStyle } from "jss";
import React from "react";
import colors from "./colors";
import { createUseStyles } from "react-jss";

const paddingEm = 1.5;
const carouselItemCommon: JssStyle = {
  justifyContent: "center",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  cursor: "pointer",
  top: "50%",
  fontSize: "3em",
  background: "rgba(255, 255, 255, 0.8)",
  opacity: 0.8,
  textShadow: "0px 0px 5px white",
  backdropFilter: "blur(2px)",
  padding: 0,
  border: 0,
  borderRadius: "100%",
  outline: "0 solid black",
  transition: "outline 100ms ease-in-out",
  "&:hover, &:active, &:focus": {
    opacity: 1,
    outlineWidth: "0.1em",
  },
};

const useStyles = createUseStyles({
  carousel: {
    background: colors.charcoal,
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    maxWidth: "initial",
    "& ul": {
      display: "flex",
      overflowX: "auto",
      overflowY: "hidden",
      gap: "3em",
      margin: 0,
      padding: 0,
      height: "100%",
      scrollSnapType: "x proximity",
      paddingBottom: "1em",
      "& li": {
        listStyle: "none",
        background: theme.secondaryBackground,
        borderRadius: "0.5em",
        display: "flex",
        height: "100%",
        margin: 0,
        flexDirection: "column",
        scrollSnapAlign: "start",
        cursor: "pointer",
        maxWidth: "80vw",
        objectFit: "cover",
        "&.focused": {
          position: "absolute",
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          borderRadius: 0,
          maxWidth: "initial",
          "&::after": {
            content: "''",
            background: "url(/src/images/icon-close.svg) center no-repeat",
            filter: "invert(1)",
            width: "3em",
            height: "3em",
            position: "absolute",
            top: 0,
            right: 0,
          },
          "& img": {
            objectFit: "contain",
            height: "75%",
          },
        },
      },
      "& img": {
        height: "50%",
        display: "block",
        padding: `${paddingEm}em ${paddingEm}em ${paddingEm / 2}em`,
        objectFit: "cover",
      },
    },
  },
  carouselHolder: {
    display: "flex",
    height: "100%",
  },
  carouselPrev: {
    ...carouselItemCommon,
    transform: "translate(-50%, -50%)",
    left: "1em",
  },
  carouselNext: {
    ...carouselItemCommon,
    transform: "translate(50%, -50%)",
    right: "1em",
  },
});

interface Props {
  entries: readonly { key: string; element: React.ReactElement }[];
}

/**
 * Generic carousel component.
 */
export default function Carousel(props: Props) {
  const { entries } = props;
  const styles = useStyles();
  return (
    <div className={styles.carousel}>
      <ul>
        {entries.map((entry) => (
          <li key={entry.key}>{entry.element}</li>
        ))}
      </ul>
      <button
        className={`carousel-prev ${styles.carouselPrev}`}
        title="Scroll back"
        type="button"
      >
        <img src="/src/images/chevron-left.svg" />
      </button>
      <button
        className={`carousel-next ${styles.carouselNext}`}
        title="Scroll Forward"
        type="button"
      >
        <img src="/src/images/chevron-right.svg" />
      </button>
    </div>
  );
}
