import { useEffect } from "react";
import { MessageType } from "../types";

export default function Receiver() {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          type: MessageType.receiver,
        })
      );
    };
    startRecieving(socket);
  }, []);
  function startRecieving(socket: WebSocket) {}
  return <div>Receiver</div>;
}
