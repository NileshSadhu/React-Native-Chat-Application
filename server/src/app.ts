import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const Client = process.env.CLIENT || "http://localhost:5173";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: Client,
    credentials: false,
  }),
);

app.use("/health", (req, res) => {
  res.send("Server health check.");
});

import authRouter from "./routes/auth.route";
app.use("/api/v1/auth", authRouter);

export default app;
