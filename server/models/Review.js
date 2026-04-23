import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: String,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;