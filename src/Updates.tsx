import { JssStyle } from "jss";
import React from "react";
import { createUseStyles } from "react-jss";

const formGap: JssStyle = {
  gap: "0.5em",
};

const useStyles = createUseStyles({
  form: {
    display: "flex",
    alignItems: "stretch",
    ...formGap,
  },
  startSymbol: {
    fontSize: "4em",
  },
  contactContainer: {
    display: "flex",
    flexDirection: "column",
    ...formGap,
  },
  textarea: {
    width: "25em",
  },
});
export default function Updates(_props: Record<string, never>) {
  const classes = useStyles();
  return (
    <section>
      <h2>Updates</h2>
      <p>
        We will update this site as arrangements are made. If you would like us
        to contact you by phone or email when this happens, you may submit your
        details here.
      </p>
      <form className={classes.form}>
        <div className={classes.startSymbol}>{"{"}</div>
        <div className={classes.contactContainer}>
          <input placeholder="Email" type="email" />
          <input placeholder="Phone Number" type="tel" />
        </div>

        <textarea
          className={classes.textarea}
          placeholder="Message for the family..."
        />
        <button type="submit">Send</button>
      </form>
    </section>
  );
}
