export type messageType =
  | "sender"
  | "receiver"
  | "createOffer"
  | "createAnswer"
  | "iceCandidates";
export enum messagesEnum {
  sender = "sender",
  receiver = "receiver",
  createOffer = "createOffer",
  createAnswer = "createAnswer",
  iceCandidates = "iceCandidates",
}
