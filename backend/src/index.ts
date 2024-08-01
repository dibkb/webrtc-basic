import { WebSocketServer, WebSocket } from "ws";
import { MessageType } from "./types";

const wss = new WebSocketServer({ port: 8080 });

let senderSocket: null | WebSocket = null;
let receiverSocket: null | WebSocket = null;

wss.on("connection", (ws) => {
  ws.on("message", (data: any) => {
    const message = JSON.parse(data);
    switch (message.type as MessageType) {
      case "sender":
        senderSocket = ws;
      case "receiver":
        receiverSocket = ws;
      case "createAnswer":
        if (ws !== receiverSocket) return;
        if (senderSocket) {
          senderSocket.send(
            JSON.stringify({
              type: MessageType.createAnswer,
              sdp: message.sdp,
            })
          );
        }
      case "createOffer":
        if (ws !== senderSocket) return;
        if (receiverSocket) {
          receiverSocket.send(
            JSON.stringify({
              type: MessageType.createOffer,
              sdp: message.sdp,
            })
          );
        }
      case "iceCandidates":
        if (ws === senderSocket) {
          if (receiverSocket) {
            receiverSocket.send(
              JSON.stringify({
                type: MessageType.iceCandidates,
                candidate: message.candidate,
              })
            );
          }
        }
        if (ws === receiverSocket) {
          if (senderSocket) {
            senderSocket.send(
              JSON.stringify({
                type: MessageType.iceCandidates,
                candidate: message.candidate,
              })
            );
          }
        }
    }
  });
  ws.on("error", (err) => {
    console.log(err);
  });
});
console.log("WebSocket server started on ws://localhost:8080");
