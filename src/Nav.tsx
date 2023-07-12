import { Breakpoints } from "./styles";
import React from "react";
import colors from "./colors";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  menuCheckbox: {
    display: "none",
    appearance: "none",
    margin: 0,
    background: "url(/src/images/icon-menu.svg) center no-repeat",
    filter: "invert(1)",
    cursor: "pointer",
    "&:checked": {
      backgroundImage: "url(/src/images/icon-close.svg)",
    },
    [`@media (max-width: ${Breakpoints.MEDIUM})`]: {
      display: "block",
      padding: "1em",
      alignSelf: "end",
    },
  },
  nav: {
    background: colors.darkGrey,
    fontSize: "1.5em",
    "& ul": {
      padding: 0,
      margin: 0,
      height: "100%",
      overflow: "auto",
    },
    [`@media (max-width: ${Breakpoints.MEDIUM})`]: {
      textAlign: "right",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      "& ul": {
        display: "none",
      },
      "& input:checked + ul": {
        display: "block",
        // 2em is the size of the padding of the close button
        height: "calc(100vh - 2em)",
        background: colors.darkGrey,
      },
    },
    "& li": {
      display: "block",
      borderBottom: `0.3em solid ${colors.darkGrey}`,
      "& a": {
        display: "block",
        color: "#fff",
        padding: "1em",
        boxSizing: "border-box",
        width: "100%",
        background: `linear-gradient(to right, ${colors.black}, ${colors.lightBlue})`,
        backgroundSize: "200%",
        transition: "all 500ms ease-in-out",
        "&:hover, &:focus": {
          backgroundPosition: "100%",
        },
      },
    },
    "& a": {
      textDecoration: "none",
    },
  },
});

export default function Nav(
  props: Readonly<{
    entries: ReadonlyArray<
      Readonly<{
        label: string;
        link: string;
      }>
    >;
  }>,
) {
  const { entries } = props;
  const classes = useStyles();
  return (
    <nav className={classes.nav}>
      <input
        className={classes.menuCheckbox}
        id="menu-button"
        role="button"
        title="Navigation Menu"
        type="checkbox"
      />
      <ul>
        {entries.map((entry) => (
          <li key={entry.label}>
            <a href={entry.link}>{entry.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
