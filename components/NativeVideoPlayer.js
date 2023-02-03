import { Cloudinary } from "cloudinary-core";
import { useEffect } from "react";
const NativeVideoPlayer = () => {
  const cld = new Cloudinary({ cloud_name: "chuloo" });
  useEffect(() => {
    const videoPlayer = cld.videoPlayer("video-player", {
      muted: true,
      controls: true
    });
    videoPlayer.source("../public/assests/video/clip.mp4");
  });
  return (
    <div>
      <video id="video-player" />
    </div>
  );
};
export default NativeVideoPlayer;
