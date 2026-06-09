import jwt from "jsonwebtoken";
import { Socket } from "socket.io";

export const socketAuth = (socket: Socket, next: (err?: Error) => void) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Unauthorized"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    socket.data.user = decoded;

    next();
  } catch (error) {
    next(new Error("Unauthorized"));
  }
};
