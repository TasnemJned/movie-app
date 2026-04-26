import express from "express";
import {
  getMovies,
  createMovie,
  getMovieReviews,
  updateMovie,
  deleteMovie,
} from "../controllers/movieController.js";

const router = express.Router();

router.get("/", getMovies);
router.post("/", createMovie);
router.get("/:id/reviews", getMovieReviews);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

export default router;