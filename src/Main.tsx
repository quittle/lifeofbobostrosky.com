import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  main: {
    background: "url(/src/hero.jpg)",
    backgroundSize: "cover",
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
  h1: {
    fontSize: "3em",
    textTransform: "uppercase",
  },
  subHeader: {
    fontSize: "2em",
  },
  blurb: {
    fontFamily: "'Send Flowers', cursive",
    fontSize: "2em",
    maxWidth: "60%",
  },
});

export default function Main(_props: Record<string, never>) {
  const classes = useStyles();
  return (
    <main className={classes.main}>
      <h1 className={classes.h1}>Robert Ostrosky</h1>
      <div className={classes.subHeader}>1928 &ndash; 2022</div>
      <p className={classes.blurb}>
        Beloved husband, father, and grandfather. You will be missed and forever
        in our hearts.
      </p>
    </main>
  );
}
