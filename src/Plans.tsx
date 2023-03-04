import React from "react";
import sections from "./sections";

export default function Plans(_props: Record<string, never>) {
  return (
    <section id={sections.plans.id}>
      <h2>{sections.plans.label}</h2>
      <p>
        Arrangements are being made for May 7th, 2023. If you{" "}
        <a href={sections.updates.link}>share your contact details</a> with us,
        we will let you know when the arrangements are finalized with additional
        details.
      </p>
    </section>
  );
}
