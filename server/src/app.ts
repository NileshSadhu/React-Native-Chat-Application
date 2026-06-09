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

export default app;
