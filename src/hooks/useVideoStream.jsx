import { usePeerConnection } from "../contexts/PeerConnectionContext";

export const useVideoStream = () => {
  const { peerConnection } = usePeerConnection();
  async function initLocalStream() {
    let localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });
    return localStream;
  }

  async function initRemoteStream() {
    let remoteStream = new MediaStream();

    peerConnection.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };
    return remoteStream;
  }
  return { initLocalStream, initRemoteStream };
};
