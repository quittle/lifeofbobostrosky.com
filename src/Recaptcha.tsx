import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  recaptchaBlurb: {
    fontSize: "0.70em",
  },
  "@global": {
    ".grecaptcha-badge": {
      visibility: "hidden",
    },
  },
});

export default function Recaptcha(_props: Record<string, never>) {
  const classes = useStyles();
  return (
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
  );
}
