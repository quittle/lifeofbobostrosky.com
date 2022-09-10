import { JssStyle } from "jss";
import React from "react";
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
  recaptchaBlurb: {
    fontSize: "0.70em",
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
  "@global": {
    ".grecaptcha-badge": {
      visibility: "hidden",
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

        <div className={classes.contact}>
          <div className={classes.startSymbol}>{"{"}</div>
          <div className={classes.contactContainer}>
            <input name="email" placeholder="Email" required type="email" />
            <input name="phone" placeholder="Phone Number" type="tel" />
          </div>
        </div>

        <textarea
          className={classes.textarea}
          name="message"
          placeholder="Message for the family..."
        />

        <button type="submit">Send</button>

        <div className={classes.recaptchaBlurb}>
          This site is protected by reCAPTCHA and the Google{" "}
          <a
            href="https://policies.google.com/privacy"
            rel="noreferrer"
            target="_blank"
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href="https://policies.google.com/terms"
            rel="noreferrer"
            target="_blank"
          >
            Terms of Service
          </a>{" "}
          apply.
        </div>

        <div
          className={classes.submissionResult}
          id="submission-result"
          tabIndex={0}
        />
      </form>
    </section>
  );
}
