import express from "express";
import Movie from "../models/Movie.js";

const router = express.Router();

// POST - add new movie
router.post("/", async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;