import React from "react";

export interface Props {
  readonly videoId: string;
  readonly title: string;
  readonly aspectRatio: number;
  readonly modestBranding?: boolean;
  readonly showRelatedVideos?: boolean;
  readonly showInfo?: boolean;
}

export default function YoutubeEmbed(props: Props) {
  const {
    videoId,
    title,
    aspectRatio,
    modestBranding,
    showRelatedVideos,
    showInfo,
  } = props;
  const url = new URL(`https://www.youtube.com/embed/${videoId}`);
  url.searchParams.set("modestbranding", modestBranding ?? true ? "1" : "0");
  url.searchParams.set("rel", showRelatedVideos ?? false ? "1" : "0");
  url.searchParams.set("showinfo", showInfo ?? false ? "1" : "0");
  url.searchParams.set("playsinline", "1");
  return (
    // eslint-disable-next-line react/iframe-missing-sandbox
    <iframe
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      frameBorder="0"
      src={url.toString()}
      style={{
        aspectRatio,
        height: "100%",
        width: "100%",
      }}
      title={title}
    />
  );
}
