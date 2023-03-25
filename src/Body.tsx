import { Breakpoints } from "./styles";
import Gallery from "./gallery/Gallery";
import Hero from "./Hero";
import MemorialWall from "./MemorialWall";
import Nav from "./Nav";
import Obituary from "./Obituary";
import Plans from "./plans/Plans";
import React from "react";
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
            sections.plans,
            sections.obituary,
            sections.gallery,
            sections.memorialWall,
          ]}
        />
        <main className={styles.main}>
          <Hero />
          <Plans />
          <Obituary />
          <Gallery />
          <MemorialWall />
        </main>
      </div>
    </body>
  );
}
