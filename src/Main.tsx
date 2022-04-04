import Picture from "./Picture";
import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  main: {
    width: "100vw",
    height: "95vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textShadow: ["0 0 1em black", "0 0 1em black", "0 0 1em black"],
    position: "relative",
    boxShadow: "0 0px 1em 0px black",
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
    background: "#e0d6cf",
  },
  h1: {
    fontSize: "3em",
    textTransform: "uppercase",
    textAlign: "center",
  },
  subHeader: {
    fontSize: "2em",
  },
  blurb: {
    fontFamily: "'Send Flowers', cursive",
    fontSize: "2em",
    maxWidth: "60%",
    "@media (max-width: 600px)": {
      fontSize: "8vw",
    },
  },
});

export default function Main(_props: Record<string, never>) {
  const classes = useStyles();
  return (
    <main className={classes.main}>
      <Picture
        alt="Robert Ostrosky in February-1967"
        classes={classes.heroImg}
        src="/src/images/pa-february-1967-1300.png"
        widths={[400, 600, 800, 1000]}
      />
      <h1 className={classes.h1}>Robert Ostrosky</h1>
      <div className={classes.subHeader}>1928 &ndash; 2022</div>
      <p className={classes.blurb}>
        Beloved husband, father, and grandfather. You will be missed and forever
        in our hearts.
      </p>
    </main>
  );
}
