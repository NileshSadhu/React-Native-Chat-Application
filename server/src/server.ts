import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 9000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error while connecting.");
    console.log(error);
  });
