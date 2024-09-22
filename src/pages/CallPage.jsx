import React, { useEffect, useState } from "react";
import { useVideoStream } from "../hooks/useVideoStream";
import { useCallHooks } from "../hooks/useCallHooks";
import { useParams } from "react-router-dom";
import Video from "../components/Video";
import Loader from "../components/Loader";
import InviteBox from "../components/InviteBox";
import EndScreen from "../components/EndScreen";
import { Button } from "../components/tailwind-frames/components/button";
import { MdCallEnd } from "react-icons/md";
import { BsFillCameraVideoFill, BsCameraVideoOffFill } from "react-icons/bs";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { usePeerConnection } from "../contexts/PeerConnectionContext";

export default function CallPage() {
  const { initLocalStream, initRemoteStream } = useVideoStream();
  const { createCall, joinCall, endCall } = useCallHooks();
  const { peerConnection } = usePeerConnection();
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [callInvite, setCallInvite] = useState(null);
  const [showInviteBox, setShowInviteBox] = useState(false);
  const [loading, setLoading] = useState(true);
  const [camera, setCamera] = useState(true);
  const [mic, setMic] = useState(true);
  const [running, setRunning] = useState(true);
  const { mode, callId } = useParams();

  peerConnection.onconnectionstatechange = () => {
    const state = peerConnection.connectionState;

    if (state === "disconnected" || state === "failed" || state === "closed") {
      setRunning(false);
    }
  };

  peerConnection.oniceconnectionstatechange = () => {
    const state = peerConnection.iceConnectionState;

    if (state === "disconnected" || state === "failed" || state === "closed") {
      setRunning(false);
    }
  };

  useEffect(() => {
    async function initialiseStreams() {
      const local = await initLocalStream();
      const remote = await initRemoteStream();

      setLocalStream(local);
      setRemoteStream(remote);
      initialiseCall();
    }

    async function initialiseCall() {
      if (mode === "created") {
        const callId = await createCall();
        setCallInvite(callId);
      } else if (mode === "joined") {
        await joinCall(callId);
        setCallInvite(callId);
      }
      setLoading(false);
    }
    initialiseStreams();
  }, []);

  function handleCameraToggle() {
    let videoTrack = localStream
      .getTracks()
      .find((track) => track.kind === "video");
    videoTrack.enabled = !videoTrack.enabled;
    setCamera(!camera);
  }

  function handleMicToggle() {
    let audioTrack = localStream
      .getTracks()
      .find((track) => track.kind === "audio");
    audioTrack.enabled = !audioTrack.enabled;
    setMic(!mic);
  }

  return (
    <div>
      {running ? (
        <div className="h-screen bg-dark-gmeet relative">
          <div className="w-full h-full relative flex justify-center">
            <Video
              className={
                "w-1/3 xl:w-1/6 absolute bottom-24 right-0 xl:bottom-5 xl:right-5 z-10 rounded-2xl border-2 border-gray-500"
              }
              sender={true}
              stream={localStream}
            />
            <Video
              className="object-center w-full h-full"
              sender={false}
              stream={remoteStream}
            />

            <div className="w-full xl:w-fit p-6 xl:px-5 xl:py-4 rounded-t-xl xl:rounded-xl flex justify-center gap-6 bg-white bg-opacity-30 absolute bottom-0 xl:bottom-2">
              <Button
                className="bg-slate-600 bg-opacity-35 rounded-full p-0 scale-125"
                onClick={() => setShowInviteBox(true)}
              >
                <IoMdPersonAdd className="text-xl" />
              </Button>
              <Button
                className="bg-slate-600 bg-opacity-35 rounded-full p-0 scale-125"
                onClick={handleMicToggle}
              >
                {mic ? (
                  <FaMicrophone className="text-xl" />
                ) : (
                  <FaMicrophoneSlash className="text-2xl" />
                )}
              </Button>
              <Button
                className="bg-slate-600 bg-opacity-35 rounded-full p-0 scale-125"
                onClick={handleCameraToggle}
              >
                {camera ? (
                  <BsFillCameraVideoFill className="text-xl" />
                ) : (
                  <BsCameraVideoOffFill className="text-xl" />
                )}
              </Button>
              <Button
                className="bg-red-600 rounded-full hover:bg-red-800 p-4 scale-125"
                onClick={() => {
                  endCall();
                  setRunning(false);
                }}
              >
                <MdCallEnd className="text-2xl" />
              </Button>
            </div>
            {showInviteBox && (
              <InviteBox
                inviteCode={callInvite}
                setShowInviteBox={setShowInviteBox}
              />
            )}
          </div>
          {loading && <Loader />}
        </div>
      ) : (
        <EndScreen />
      )}
    </div>
  );
}
