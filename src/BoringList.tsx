import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  list: {
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
});

function join(list?: readonly string[], joiner = " "): string {
  return (list ?? []).join(joiner);
}

/**
 * An unstyled `<ul>` of items, displayed as a series of blocks.
 */
export default function BoringList(
  props: React.PropsWithChildren<{
    listClassNames?: readonly string[];
    listItemClassNames?: readonly string[];
  }>,
) {
  const { children, listClassNames, listItemClassNames } = props;

  const childrenArray = Array.isArray(children) ? children : [children];
  const styles = useStyles();
  return (
    <ul className={`${styles.list} ${join(listClassNames)}`}>
      {React.Children.map(childrenArray, (entry) => (
        <li className={join(listItemClassNames)} key={entry.id}>
          {entry}
        </li>
      ))}
    </ul>
  );
}
