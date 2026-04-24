import express from "express";
import mongoose from "mongoose";
import Review from "../models/Review.js";

const router = express.Router();

// POST - add review
router.post("/", async (req, res) => {
  try {
    const { movieId, userId, rating, comment } = req.body;

    // ✅ تحقق من القيم
    if (!movieId || !userId || rating === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ تحقق من صحة ObjectId
    if (
      !mongoose.Types.ObjectId.isValid(movieId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    // ✅ تحويل لـ ObjectId (حل المشكلة 🔥)
    const newReview = new Review({
      movieId: new mongoose.Types.ObjectId(movieId),
      userId: new mongoose.Types.ObjectId(userId),
      rating,
      comment,
    });

    const savedReview = await newReview.save();

    res.status(201).json(savedReview);
  } catch (error) {
    console.error("ERROR:", error.message); // 👈 debugging
    res.status(500).json({ error: error.message });
  }
});

export default router;