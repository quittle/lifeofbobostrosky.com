import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  list: {
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
});

/**
 * An unstyled `<ul>` of items, displayed as a series of blocks.
 */
export default function BoringList(props: React.PropsWithChildren) {
  const { children } = props;

  const childrenArray = Array.isArray(children) ? children : [children];
  const styles = useStyles();
  return (
    <ul className={styles.list}>
      {React.Children.map(childrenArray, (entry) => (
        <li key={entry.id}>{entry}</li>
      ))}
    </ul>
  );
}
