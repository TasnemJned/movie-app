import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  genre: {
    type: String
  },
  releaseYear: {
    type: Number
  },
  averageRating: {
    type: Number,
    min: 0,
    max: 5
  }
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;