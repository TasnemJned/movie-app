import express from "express";
import mongoose from "mongoose";
import Review from "../models/Review.js";

const router = express.Router();


// ==========================
// POST - add review
// ==========================
router.post("/", async (req, res) => {
  try {
    const { movieId, userId, rating, comment } = req.body;

    // تحقق من القيم
    if (!movieId || !userId || rating === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // تحقق من صحة ObjectId
    if (
      !mongoose.Types.ObjectId.isValid(movieId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const newReview = new Review({
      movieId: new mongoose.Types.ObjectId(movieId),
      userId: new mongoose.Types.ObjectId(userId),
      rating,
      comment,
    });

    const savedReview = await newReview.save();

    res.status(201).json(savedReview);
  } catch (error) {
    console.error("ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
});


// ==========================
// GET - reviews by user
// ==========================
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
// validate ObjectId to prevent MongoDB errors

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const reviews = await Review.find({ userId })
      .populate("movieId", "title genre");

    res.status(200).json(reviews);
  } catch (error) {
    console.error("ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
});


// ==========================
// GET - all reviews
// ==========================
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("movieId", "title genre")
      .populate("userId", "name email");

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ==========================
// DELETE - delete review
// ==========================
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // تحقق من صحة ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid review ID" });
    }

    const deletedReview = await Review.findByIdAndDelete(id);

    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
});


export default router;