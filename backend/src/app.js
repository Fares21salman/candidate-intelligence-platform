import express from "express";
import cors from "cors"; // ✅ ADD THIS
import candidateRoutes from "./routes/candidateRoutes.js";

const app = express();

app.use(cors()); // ✅ ADD THIS
app.use(express.json());

app.use("/api/candidates", candidateRoutes);

export default app;