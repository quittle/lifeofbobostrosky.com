import { Breakpoints } from "./styles";
import Hero from "./Hero";
import Nav from "./Nav";
import Plans from "./Plans";
import React from "react";
import Updates from "./Updates";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  wrapper: {
    display: "flex",
    height: "100%",
    [`@media (max-width: ${Breakpoints.MEDIUM})`]: {
      flexDirection: "column",
    },
  },
  main: {
    flexGrow: 1,
    overflowY: "scroll",
    scrollBehavior: "smooth",
  },
});

export default function Body(_props: Record<string, never>) {
  const styles = useStyles();

  return (
    <body>
      <div className={styles.wrapper}>
        <Nav
          entries={[
            { link: "#home", label: "Home" },
            { link: "#updates", label: "Updates" },
            { link: "#plans", label: "Plans" },
          ]}
        />
        <main className={styles.main}>
          <Hero />
          <Updates />
          <Plans />
        </main>
      </div>
    </body>
  );
}
