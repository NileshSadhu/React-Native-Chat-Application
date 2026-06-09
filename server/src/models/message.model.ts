import mongoose from "mongoose";

export interface IMessage {
  senderId: string;
  senderName: string;
  text: string;
  timestamp?: Date;
}

const messageSchema = new mongoose.Schema<IMessage>({
  senderId: {
    type: String,
    required: true,
  },
  senderName: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const Message = mongoose.model<IMessage>("Message", messageSchema);
