import mongoose from "mongoose";
import Review from "../models/Review.js";

export const createReview = async (req, res) => {
  try {
    const { movieId, userId, rating, comment } = req.body;

    if (!movieId || !userId || rating === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (
      !mongoose.Types.ObjectId.isValid(movieId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const newReview = new Review({
      movieId,
      userId,
      rating,
      comment,
    });

    const savedReview = await newReview.save();

    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};