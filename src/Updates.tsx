import { JssStyle } from "jss";
import React from "react";
import Recaptcha from "./Recaptcha";
import { createUseStyles } from "react-jss";
import { darkText } from "./styles";

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
  textarea: {
    width: "100%",
    height: "6em",
  },
  submissionResult: {
    padding: "0.5em",
    fontSize: "1.5em",
    border: "0.2em solid black",
    ...darkText,
    display: "none",
    "&.success, &.error": {
      display: "block",
    },
    "&.success": {
      backgroundColor: "#b2ffb2",
      borderColor: "#61ad61",
    },
    "&.error": {
      backgroundColor: "#e4e47e",
      borderColor: "#979708",
    },
  },
});

export default function Updates(_props: Record<string, never>) {
  const classes = useStyles();
  return (
    <section id="updates">
      <h2>Updates</h2>
      <p>
        We will update this site as arrangements are made. If you would like us
        to contact you by phone or email when this happens, you may submit your
        details here.
      </p>
      <form
        action="https://api.lifeofbobostrosky.com/contact"
        className={classes.form}
        id="contact-form"
        method="post"
        target="_blank"
      >
        <input name="name" placeholder="Name" required type="text" />
        <input name="email" placeholder="Email" required type="email" />
        <input name="phone" placeholder="Phone Number (Optional)" type="tel" />
        <input name="address" placeholder="Address (Optional)" type="text" />

        <textarea
          className={classes.textarea}
          name="message"
          placeholder="Message for the family..."
        />

        <button type="submit">Send</button>

        <Recaptcha />

        <div
          className={classes.submissionResult}
          id="submission-result"
          tabIndex={0}
        />
      </form>
    </section>
  );
}
