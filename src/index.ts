import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db";
import userRouter from "./routes/userRouter";
import preferenceRouter from "./routes/preferencesRouter";

dotenv.config(); // Load .env variables

const app: Application = express();
const PORT = process.env.PORT || 2300;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use("/users", userRouter, preferenceRouter);
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
