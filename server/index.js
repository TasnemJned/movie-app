import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; // 👈 أضف هذا
import movieRoutes from "./routes/movieRoutes.js";

dotenv.config();

const app = express();

app.use(cors()); // 👈 أضف هذا
app.use(express.json());

app.use("/api/movies", movieRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});