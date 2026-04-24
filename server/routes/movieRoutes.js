import express from "express";
import Movie from "../models/Movie.js";
import Review from "../models/Review.js";

const router = express.Router();

// POST - add new movie
router.post("/", async (req, res) => {
  try {
    const { title, genre } = req.body;

    // ✅ validation بسيط
    if (!title || !genre) {
      return res.status(400).json({ message: "Title and genre are required" });
    }

    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();

    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET - get all movies (WITH FILTER ⭐)
router.get("/", async (req, res) => {
  try {
    const { genre } = req.query;

    let filter = {};

    if (genre) {
      filter.genre = genre;
    }

    const movies = await Movie.find(filter);

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ⭐ NEW: GET movie with its reviews (RELATIONAL 🔥)
router.get("/:id/reviews", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const reviews = await Review.find({ movieId: req.params.id }).populate("userId");

    res.status(200).json({
      movie,
      reviews,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE - update movie by id
router.put("/:id", async (req, res) => {
  try {
    const { title, genre } = req.body;

    // ✅ validation بسيط
    if (!title || !genre) {
      return res.status(400).json({ message: "Title and genre are required" });
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE - delete movie by id
router.delete("/:id", async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;