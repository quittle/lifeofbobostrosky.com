import { Breakpoints } from "./styles";
import Picture from "./Picture";
import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  main: {
    height: "95vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "end",
    alignItems: "center",
    textShadow: ["0 0 1em black", "0 0 1em black", "0 0 1em black"],
    position: "relative",
    boxShadow: "0 0px 1em 0px black",
    [`@media (max-width: ${Breakpoints.MEDIUM})`]: {
      height: "calc(95vh - 3em)",
    },
  },
  heroImg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center 23%",
    zIndex: -1,
    // Roughly matches the grey of the background of the image
    background: "#e0d6cf",
  },
  h1: {
    fontSize: "6vmax",
    textTransform: "uppercase",
    textAlign: "center",
    padding: "0 1em",
  },
  subHeader: {
    fontSize: "4vmax",
  },
  blurb: {
    fontFamily: "'Send Flowers', cursive",
    fontSize: "min(4vmax, 2em)",
    maxWidth: "60%",
  },
});

export default function Main(_props: Record<string, never>) {
  const classes = useStyles();
  return (
    <div className={classes.main} id="home">
      <Picture
        alt="Robert Ostrosky in February 1967"
        classes={classes.heroImg}
        src="/src/images/pa-february-1967-1300.png"
        widths={[400, 600, 800, 1000]}
      />
      <h1 className={classes.h1}>Robert Ostrosky</h1>
      <div className={classes.subHeader}>1929 &ndash; 2022</div>
      <p className={classes.blurb}>
        Beloved husband, father, and grandfather. He will be missed and forever
        in our hearts.
      </p>
    </div>
  );
}
