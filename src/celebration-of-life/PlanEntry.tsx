import { Breakpoints } from "../styles";
import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  entry: {
    display: "flex",
    marginBottom: "1em",
    [`@media (max-width: ${Breakpoints.LARGE})`]: {
      flexDirection: "column",
    },
  },
  title: {
    display: "inline",
    width: "7em",
    margin: 0,
  },
  content: {
    flexGrow: 1,
  },
});

export default function PlanEntry(
  props: React.PropsWithChildren<{
    readonly title: string;
  }>,
) {
  const classes = useStyles();
  const { title, children } = props;
  return (
    <div className={classes.entry}>
      <h3 className={classes.title}>{title}</h3>
      <div className={classes.content}>{children}</div>
    </div>
  );
}
