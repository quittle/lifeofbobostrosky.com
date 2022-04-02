import ImageHolder from "./ImageHolder";
import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  h1: {
    color: "red",
  },
  main: {
    background: "url(/src/hero.jpg)",
  },
});

export default function Main(_props: Record<string, never>) {
  const classes = useStyles();
  return (
    <div className={classes.main} id="main">
      <h1 className={classes.h1}>Robert Ostrosky</h1>
      <ImageHolder img="/src/rust-constant.png" />
    </div>
  );
}
