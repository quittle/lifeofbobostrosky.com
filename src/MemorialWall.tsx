import React from "react";
import Recaptcha from "./Recaptcha";
import StatusBlock from "./StatusBlock";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  memorialWall: {
    "& form": {
      "& input, & textarea": {
        width: "100%",
      },
    },
  },
  submitWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "1em",
  },
  success: {
    display: "none",
    ".submit-success &": {
      display: "block",
    },
  },
  error: {
    display: "none",
    ".submit-error &": {
      display: "block",
    },
  },
});

export default function MemorialWall(_props: Record<string, never>) {
  const styles = useStyles();
  return (
    <section className={styles.memorialWall} id="memorial-wall">
      <h1>Memorial Wall</h1>
      <p>Please share your memories of Robert Ostrosky.</p>
      <form
        action="https://api.lifeofbobostrosky.com/memorial-wall"
        encType="multipart/form-data"
        id="memorial-wall-form"
        method="post"
        target="_blank"
      >
        <label>
          Your Name
          <input name="name" required />
        </label>
        <label>
          Contact number or email
          <input name="contact" />
        </label>
        <label>
          Your memory
          <textarea name="memory" required />
        </label>
        <label>
          Where did this take place?
          <input name="location" placeholder="Location" type="" />
        </label>
        <label>
          When was this?
          <input
            name="date"
            placeholder="When is this memory from?"
            type="date"
          />
        </label>
        <label>
          Any photos or videos?
          <input
            accept="image/*,audio/*,video/*"
            multiple
            name="files"
            type="file"
          />
        </label>
        <div className={styles.submitWrapper}>
          <button type="submit">Submit Memory</button>
          <span className={styles.success}>
            <StatusBlock type="success" />
          </span>
          <span className={styles.error}>
            <StatusBlock type="error" />
          </span>
        </div>
        <Recaptcha />
      </form>
    </section>
  );
}
