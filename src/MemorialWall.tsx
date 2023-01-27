import { API_URL_BASE } from "./domains";
import BoringList from "./BoringList";
import Memory from "./Memory";
import React from "react";
import Recaptcha from "./Recaptcha";
import StatusBlock from "./StatusBlock";
import { createUseStyles } from "react-jss";
import sections from "./sections";

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

const MEMORIES = [
  <Memory author="Stephanie Troi" key="troi">
    <p>
      Bob became uncle to my mom in 1932 when he was only 3 years old. He always
      called my dad Stanley on the phone to chat when dad lived with me here in
      Tampa, Florida. My dad looked forward to his phone calls. I always got a
      kick out of it because my dad always called him Uncle Bobby while talking
      on the phone and they were only 5 years apart in age. He never referred to
      him as Bob, always <em>UNCLE</em> Bobby.
    </p>
    <p>
      My dad Stanley passed in June 2019 at the age of 95. Like your
      grandfather, my dad was an amazing, loving and caring person who is deeply
      missed.
    </p>
  </Memory>,
];

export default function MemorialWall(_props: Record<string, never>) {
  const styles = useStyles();
  return (
    <section className={styles.memorialWall} id={sections.memorialWall.id}>
      <h1>{sections.memorialWall.label}</h1>

      <BoringList>{MEMORIES}</BoringList>
      <p>Please share your memories of Robert Ostrosky.</p>
      <form
        action={new URL("/memorial-wall", API_URL_BASE).toString()}
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
            <StatusBlock type="success">
              Thank you for sharing. <a href={sections.updates.link}>Sign up</a>{" "}
              to be notified about updates.
            </StatusBlock>
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
