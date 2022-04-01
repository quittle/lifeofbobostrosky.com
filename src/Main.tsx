import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  h1: {
    color: "red",
  },
});

export default function Main(_props: Record<string, never>) {
  const classes = useStyles();
  return (
    <div id="main">
      <h1 className={classes.h1}>Robert Ostrosky</h1>
    </div>
  );
}
