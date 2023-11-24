import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  figure: {
    background: "rgba(0, 0, 0, 0.3)",
    padding: "1em",
  },
  author: {
    textAlign: "right",
    "&::before": {
      content: "'—'",
      marginRight: "0.5em",
    },
  },
});

/**
 * A memory for the memorial wall.
 */
export default function Memory(props: {
  readonly children: React.ReactElement[];
  readonly author: string;
}) {
  const styles = useStyles();
  const { children, author } = props;
  return (
    <figure className={styles.figure}>
      <blockquote>{children}</blockquote>
      <figcaption className={styles.author}>{author}</figcaption>
    </figure>
  );
}
