import { CssClasses, darkText } from "./styles";
import { API_URL_BASE } from "./domains";
import { JssStyle } from "jss";
import React from "react";
import Recaptcha from "./Recaptcha";
import { createUseStyles } from "react-jss";
import sections from "./sections";

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
    border: "0.2em solid black",
    ...darkText,
    display: "none",
    "&.success, &.error": {
      display: "block",
    },
    "&.success": {
      backgroundColor: "#b2ffb2",
      borderColor: "#61ad61",
      "& .error-message": {
        display: "none",
      },
    },
    "&.error": {
      backgroundColor: "#e4e47e",
      borderColor: "#979708",
      "& .success-message": {
        display: "none",
      },
    },
  },
});

export default function Updates(_props: Record<string, never>) {
  const classes = useStyles();
  return (
    <section id={sections.updates.id}>
      <h2>{sections.updates.label}</h2>
      <p>
        We will update this site as arrangements are made. If you would like us
        to contact you by phone or email when this happens, you may submit your
        details here.
      </p>
      <form
        action={new URL("/contact", API_URL_BASE).toString()}
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
          className={`${classes.submissionResult} ${CssClasses.LIGHT_BACKGROUND}`}
          id="submission-result"
          tabIndex={0}
        >
          <span className="success-message">
            Thank you for your submission. If you have any memories, images, or
            videos to share,{" "}
            <a href={sections.memorialWall.link}>please do so here</a>.
          </span>
          <span className="error-message" />
        </div>
      </form>
    </section>
  );
}
