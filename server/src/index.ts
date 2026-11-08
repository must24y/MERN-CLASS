import "dotenv/config";
import express from "express";
import cors from "cors";

import { connectDB } from "./config/database.js";

import userRoutes from "./routes/user.routes.js";

const app = express();

const PORT = Number(process.env.PORT) || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// calling the routes

app.use("/api/users", userRoutes);


// Test route
app.get("/", (_req, res) => {
  res.status(200).json({
    message: "MERN Classroom API is running",
  });
});

// Start application
const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Application startup failed:", error);
    process.exit(1);
  }
};

startServer();
