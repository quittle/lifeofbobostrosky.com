import BoringList from "../BoringList";
import Event from "./Event";
import PlanEntry from "./PlanEntry";
import React from "react";
import SecretLink from "../SecretLink";
import { base64Decode } from "../utils";
import colors from "../colors";
import { createUseStyles } from "react-jss";
import sections from "../sections";

const useStyles = createUseStyles({
  rsvp: {
    display: "inline-block",
    background: colors.veryLightBlue,
    textDecoration: "none",
    color: [[colors.black], "!important"],
    padding: "1em",
    margin: "1em 0 0",
    borderRadius: "0.3em",
  },
  scheduleItem: {
    padding: "0.5em 0",
  },
});

export default function Plans(_props: Record<string, never>) {
  const classes = useStyles();
  return (
    <section id={sections.plans.id}>
      <h2>{sections.plans.label}</h2>
      <p>A Celebration of Life will be held on May 7th, 2023.</p>
      <PlanEntry title="When">
        <time>May 7th, 2023</time>
        <br />
        4:30pm – 7:30pm
      </PlanEntry>
      <PlanEntry title="Where">
        <address>
          <b>Claret Hall</b>
          <br />
          6020 Daybreak Circle
          <br />
          Clarksville, MD 21029
          <br />
          <a
            href="https://goo.gl/maps/BFsE1Y1ZbJg68qEE9"
            rel="noreferrer"
            target="_blank"
          >
            Google Maps
          </a>
        </address>
      </PlanEntry>
      <PlanEntry title="RSVP">
        Please RSVP by <time>April 21, 2023</time>
        <br />
        <a
          className={classes.rsvp}
          href="https://docs.google.com/forms/d/e/1FAIpQLSe90MbWpINyNINQ_L_Q6kKWvEQe0tcKH7ZQ_lBDohknswhvEA/viewform"
          rel="noreferrer"
          target="_blank"
        >
          Click here to RSVP
        </a>
      </PlanEntry>
      <PlanEntry title="Schedule">
        <BoringList listItemClassNames={[classes.scheduleItem]}>
          <Event
            end="5:00pm"
            events={["Arrive & Sign Book", "Drinks and Hors d’Oeuvres"]}
            start="4:30pm"
          />
          <Event
            end="6:00pm"
            events={["Remembering Bob", "Everyone Shares Stories"]}
            start="5:00pm"
          />
          <Event end="7:30pm" events={["Buffet Dinner"]} start="6:00pm" />
        </BoringList>
      </PlanEntry>
      <PlanEntry title="Questions">
        Contact Tamara Doloff at{" "}
        <address>
          {/* Hide the phone number and email address from web crawlers of the source code. */}
          <SecretLink
            contents={base64Decode("MzAxLTUwOS02NTc0")}
            href={base64Decode("dGVsOisxMzAxNTA5NjU3NA==")}
          />{" "}
          or{" "}
          <SecretLink
            contents={base64Decode("dGFtYXJhQGRvbG9mZnByaW50aW5nLmNvbQ==")}
            href={base64Decode("bWFpbHRvOnRhbWFyYUBkb2xvZmZwcmludGluZy5jb20=")}
          />
        </address>
      </PlanEntry>
      <p>
        We look forward to hearing everyone&apos;s memories, if you would like
        to share one at the celebration&hellip;
      </p>
      <p>
        Please include the following
        <ol>
          <li>Your name</li>
          <li>Where you&apos;re from</li>
          <li>How you met Bob or how you knew each other</li>
          <li>Your story</li>
        </ol>
      </p>
      <p>
        If you wish to{" "}
        <a href={sections.memorialWall.link}>share photographs with us</a>, we
        will display them.
      </p>
    </section>
  );
}
