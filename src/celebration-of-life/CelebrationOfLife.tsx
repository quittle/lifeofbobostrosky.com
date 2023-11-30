import React from "react";
import YoutubeEmbed from "../YoutubeEmbed";
import sections from "../sections";

export default function CelebrationOfLife(_props: Record<string, never>) {
  return (
    <section id={sections.celebrationOfLife.id}>
      <h2>{sections.celebrationOfLife.label}</h2>
      <p>
        A Celebration of Life for Robert Ostrosky was held at{" "}
        <a
          href="https://goo.gl/maps/BFsE1Y1ZbJg68qEE9"
          rel="noreferrer"
          target="_blank"
        >
          Claret Hall
        </a>{" "}
        on <time>May 7th, 2023</time>.
      </p>
      <figure>
        <figcaption>Here is the recording of the event:</figcaption>
        <br />
        <YoutubeEmbed
          aspectRatio={1280 / 720}
          title="Celebration of Life Recording"
          videoId="X4gHXd09jjs"
        />
      </figure>
      <p>
        If you wish to{" "}
        <a href={sections.memorialWall.link}>
          share memories or photographs with us
        </a>
        , we would deeply appreciate it.
      </p>
    </section>
  );
}
