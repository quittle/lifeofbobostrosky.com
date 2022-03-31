import React from "react";
import ImageHolder from "./ImageHolder";
import Head from "./Head";

export default function App(props: {}) {
  return (<html>
    <Head />
    <h1>Robert Ostrosky</h1>
    <ImageHolder img="/src/rust-constant.png" alt="photo alt text"><p>more text</p></ImageHolder>
  </html>);
}
