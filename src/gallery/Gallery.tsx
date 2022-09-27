import * as theme from "../styles";
import { JssStyle } from "jss";
import React from "react";
import colors from "../colors";
import { createUseStyles } from "react-jss";
import { getGalleryEntries } from "./gallery-entries";

const paddingEm = 1.5;
const galleryItemCommon: JssStyle = {
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
  gallery: {
    background: colors.charcoal,
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    "& ul": {
      display: "flex",
      overflowX: "auto",
      overflowY: "hidden",
      gap: "3em",
      margin: 0,
      scrollSnapType: "x proximity",
      paddingBottom: "1em",
      "& li": {
        listStyle: "none",
        background: theme.secondaryBackground,
        borderRadius: "0.5em",
        display: "flex",
        flexDirection: "column",
        scrollSnapAlign: "start",
        cursor: "pointer",
        "&.focused": {
          position: "absolute",
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          borderRadius: 0,
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
      },
    },
  },
  carouselHolder: {
    display: "flex",
    height: "100%",
  },
  details: {
    cursor: "initial",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "0 0 0.5em 0.5em",
    background: "rgba(0, 0, 0, 0.3)",
    margin: 0,
    padding: `${paddingEm / 2}em ${paddingEm}em ${paddingEm}em`,
    flexGrow: 1,
    overflow: "hidden",
    ".focused &": {
      borderRadius: 0,
    },
  },
  description: {
    overflow: "auto",
  },
  locationDate: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.8em",
    alignItems: "flex-end",
    gap: "1em",
  },
  galleryPrev: {
    ...galleryItemCommon,
    transform: "translate(-50%, -50%)",
    left: "1em",
  },
  galleryNext: {
    ...galleryItemCommon,
    transform: "translate(50%, -50%)",
    right: "1em",
  },
});

export default function Gallery() {
  const galleryEntries = getGalleryEntries();
  const styles = useStyles();
  return (
    <section className={styles.gallery} id="gallery">
      <h1>Gallery</h1>
      <ul>
        {galleryEntries.map((entry) => (
          <li key={entry.imgPath}>
            <img alt="" src={entry.imgPath} />
            <div className={styles.details}>
              <div className={styles.description}>{entry.description}</div>
              <small className={styles.locationDate}>
                {entry.location ?? <div>{entry.location}</div>}
                <time dateTime={entry.date.toUTCString()}>
                  {entry.date.toLocaleDateString()}
                </time>
              </small>
            </div>
          </li>
        ))}
      </ul>
      <button
        className={styles.galleryPrev}
        id="gallery-prev"
        title="Scroll back"
        type="button"
      >
        <img src="/src/images/chevron-left.svg" />
      </button>
      <button
        className={styles.galleryNext}
        id="gallery-next"
        title="Scroll Forward"
        type="button"
      >
        <img src="/src/images/chevron-right.svg" />
      </button>
    </section>
  );
}
