import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  releaseYear: {
    type: Number
  },
  averageRating: {
    type: Number,
    min: 0,
    max: 5
  },

  // ✅ الجديد (Custom Field)
  director: {
    type: String,
    default: "Unknown"
  }
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;