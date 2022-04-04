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
    flexDirection: "column",
    maxWidth: "30em",
    ...formGap,
    "& input": {
      width: "100%",
    },
  },
  contact: {
    display: "flex",
    width: "100%",
    ...formGap,
  },
  startSymbol: {
    fontSize: "4em",
  },
  contactContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    ...formGap,
  },
  textarea: {
    width: "100%",
    height: "6em",
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
      <form
        action="https://api.lifeofbobostrosky.com/contact"
        className={classes.form}
        method="post"
      >
        <input name="name" placeholder="Name" type="text" />

        <div className={classes.contact}>
          <div className={classes.startSymbol}>{"{"}</div>
          <div className={classes.contactContainer}>
            <input name="email" placeholder="Email" type="email" />
            <input name="phone" placeholder="Phone Number" type="tel" />
          </div>
        </div>

        <textarea
          className={classes.textarea}
          name="message"
          placeholder="Message for the family..."
        />
        <button type="submit">Send</button>
      </form>
    </section>
  );
}
