import React, { useEffect, useRef, useState } from "react";
import { Button } from "../components/tailwind-frames/components/button";
import { IoVolumeMediumSharp, IoVolumeMute } from "react-icons/io5";

function Video({ sender, stream, className }) {
  const videoRef = useRef(null);
  const [mute, setMute] = useState(false);

  useEffect(() => {
    videoRef.current.srcObject = stream;
  }, [stream]);
  return (
    <div className={sender ? "" : "relative"}>
      {!sender && (
        <Button
          className="absolute top-2 right-2 rounded-full p-0 bg-slate-800 bg-opacity-25 z-20"
          onClick={() => {
            setMute(!mute);
          }}
        >
          {mute ? (
            <IoVolumeMute className="text-xl " />
          ) : (
            <IoVolumeMediumSharp className="text-xl" />
          )}
        </Button>
      )}
      <video
        ref={videoRef}
        className={className}
        muted={sender || mute}
        poster="https://i.imgur.com/aVXTCul.gif"
        autoPlay
        playsInline
        disablePictureInPicture
      />
    </div>
  );
}

export default Video;
