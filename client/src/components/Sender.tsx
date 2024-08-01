import { useEffect, useState } from "react";
import { MessageType } from "../types";
function Sender() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [peerConnection, setPeerConnection] =
    useState<null | RTCPeerConnection>(null);
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    setSocket(socket);
    if (socket)
      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            type: MessageType.sender,
          })
        );
      };
  }, []);
  const initiateConnection = async () => {};
  const getCameraStreamAndSend = (pc: RTCPeerConnection) => {};
  return <div></div>;
}

export default Sender;
