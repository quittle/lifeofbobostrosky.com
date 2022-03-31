import React from "react";
import ImageHolder from "./ImageHolder";

export default function App(props) {
  return (<html>
    <h1>Title</h1>
    <ImageHolder img="/src/rust-constant.png" alt="photo alt text"><p>more text</p></ImageHolder>
  </html>);
}
