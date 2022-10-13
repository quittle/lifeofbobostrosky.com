import { CssClasses, darkText } from "./styles";
import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  statusBlock: {
    padding: "0.5em",
    border: "0.2em solid black",
    ...darkText,
    "&.success, &.error": {
      display: "block",
    },
    "&.success": {
      backgroundColor: "#b2ffb2",
      borderColor: "#61ad61",
    },
    "&.error": {
      backgroundColor: "#e4e47e",
      borderColor: "#979708",
    },
  },
});

export default function StatusBlock({
  type,
  children,
}: {
  type: "success" | "error";
  children?: React.ReactNode;
}) {
  const classes = useStyles();
  return (
    <aside
      className={`${classes.statusBlock} ${type} ${CssClasses.LIGHT_BACKGROUND}`}
    >
      {children}
    </aside>
  );
}
