"use client";

import ReactPlayer from "react-player";

type VideoPlayerProps = {
  src?: string;
  aparatEmbedUrl?: string;
};

export default function VideoPlayer({ src, aparatEmbedUrl }: VideoPlayerProps) {
  if (aparatEmbedUrl) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-lg">
        <iframe
          src={aparatEmbedUrl}
          className="h-full w-full"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg">
      <ReactPlayer url={src} width="100%" height="100%" controls />
    </div>
  );
}
