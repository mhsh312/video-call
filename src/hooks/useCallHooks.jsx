import { usePeerConnection } from "../contexts/PeerConnectionContext";
import { firestore } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  onSnapshot,
  getDoc,
  updateDoc,
} from "firebase/firestore";

export const useCallHooks = () => {
  const { peerConnection } = usePeerConnection();
  async function createCall() {
    const callCollection = collection(firestore, "calls");
    const callDoc = await addDoc(callCollection, {});
    const offerCandidates = collection(callDoc, "offerCandidates");
    const answerCandidates = collection(callDoc, "answerCandidates");

    peerConnection.onicecandidate = (event) => {
      event.candidate && addDoc(offerCandidates, event.candidate.toJSON());
    };

    const offerDescription = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await setDoc(callDoc, { offer });

    onSnapshot(callDoc, (snapshot) => {
      const data = snapshot.data();
      if (!peerConnection.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        peerConnection.setRemoteDescription(answerDescription);
      }
    });

    onSnapshot(answerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          peerConnection.addIceCandidate(candidate);
        }
      });
    });

    return callDoc.id;
  }

  async function joinCall(callId) {
    const callCollection = collection(firestore, "calls");
    const callDoc = doc(callCollection, callId);
    const offerCandidates = collection(callDoc, "offerCandidates");
    const answerCandidates = collection(callDoc, "answerCandidates");

    peerConnection.onicecandidate = (event) => {
      event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
    };

    const callData = (await getDoc(callDoc)).data();

    const offerDescription = callData.offer;
    await peerConnection.setRemoteDescription(
      new RTCSessionDescription(offerDescription)
    );

    const answerDescription = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };

    await updateDoc(callDoc, { answer: answer });

    onSnapshot(offerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          let data = change.doc.data();
          peerConnection.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
  }

  function endCall() {
    peerConnection.close();
  }

  return { createCall, joinCall, endCall };
};
