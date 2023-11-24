import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  imageGroup2: {
    position: "relative",
    "& img": {
      position: "absolute",
      clipPath: "polygon(0% 0%, 0% 0%, 100% 100%, 0% 100%)",
    },
  },
});

export default function ImageGroup(props: {
  readonly images: ReadonlyArray<string>;
}) {
  const styles = useStyles();
  const { images } = props;
  if (images.length === 0) {
    return <span />;
  } else if (images.length === 1) {
    return <img alt="" src={images[0]} />;
  } else if (images.length === 2) {
    return (
      <span className={styles.imageGroup2}>
        <img alt="" src={images[0]} />
        <img alt="" src={images[1]} />
      </span>
    );
  }
  throw new Error(`Unsupported number of images: ${images.length}.`);
}
