import { Breakpoints } from "./styles";
import Gallery from "./gallery/Gallery";
import Hero from "./Hero";
import MemorialWall from "./MemorialWall";
import Nav from "./Nav";
import Obituary from "./Obituary";
import Plans from "./Plans";
import React from "react";
import Updates from "./Updates";
import { createUseStyles } from "react-jss";
import sections from "./sections";

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
            sections.home,
            sections.updates,
            sections.obituary,
            sections.gallery,
            sections.memorialWall,
            sections.plans,
          ]}
        />
        <main className={styles.main}>
          <Hero />
          <Updates />
          <Obituary />
          <Gallery />
          <MemorialWall />
          <Plans />
        </main>
      </div>
    </body>
  );
}
