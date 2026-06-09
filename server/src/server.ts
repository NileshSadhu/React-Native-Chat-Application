import dns from "node:dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

import dotenv from "dotenv";
import connectDB from "./config/db";
import app from "./app";
import { createServer } from "http";
import { initSocket } from "./socket/socket";
import { socketAuth } from "./middleware/message.middleware";
import { Message } from "./models/message.model";

dotenv.config();

const PORT = process.env.PORT || 9000;

const httpServer = createServer(app);

connectDB()
  .then(() => {
    const io = initSocket(httpServer);

    io.use(socketAuth);

    io.on("connection", (socket) => {
      console.log("User connected:", socket.data.user.username);

      socket.on("send-message", async (data) => {
        const user = socket.data.user;
        const message = await Message.create({
          senderId: user.userId,
          senderName: user.username,
          text: data.text,
        });

        io.emit("receive-message", message);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });

    httpServer.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
