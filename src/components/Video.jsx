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
        poster="https://cdn.discordapp.com/attachments/427097807057584131/1284544029584785452/loading.gif?ex=66e7045a&is=66e5b2da&hm=a61765a14a32281c77f15e7f493cc9d1cca7c3a70463c32b8859ec248754e002&"
        autoPlay
        playsInline
        disablePictureInPicture
      />
    </div>
  );
}

export default Video;
