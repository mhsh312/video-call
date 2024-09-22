import React, { createContext, useContext } from "react";
import servers from "../stun/serverconfig";

const PeerConnectionContext = createContext();

export const PeerConnectionProvider = ({ children }) => {
  const peerConnection = new RTCPeerConnection(servers);

  return (
    <PeerConnectionContext.Provider value={{ peerConnection }}>
      {children}
    </PeerConnectionContext.Provider>
  );
};

export const usePeerConnection = () => {
  return useContext(PeerConnectionContext);
};
