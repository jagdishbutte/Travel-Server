import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
// import router from "./routes";

dotenv.config(); // Load .env variables

const app: Application = express();
const PORT = process.env.PORT || 2300;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
// app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
