import { Breakpoints } from "../styles";
import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  event: {
    display: "flex",
    textAlign: "left",
    [`@media (max-width: ${Breakpoints.LARGE})`]: {
      flexDirection: "column",
    },
  },
  times: {
    fontWeight: "bold",
    minWidth: "9em",
  },
});

export default function Event(props: {
  start: string;
  end: string;
  events: readonly string[];
}) {
  const classes = useStyles();
  const { start, end, events } = props;
  return (
    <div className={classes.event}>
      <div className={classes.times}>
        <time>{start}</time> – <time>{end}</time>
      </div>
      <div>
        {events.map((event) => (
          <div key={event}>{event}</div>
        ))}
      </div>
    </div>
  );
}
