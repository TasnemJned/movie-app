import mongoose from "mongoose";
import Movie from "./models/Movie.js";
import User from "./models/User.js";
import Review from "./models/Review.js";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  try {
    //  تنظيف الداتابيس
    await Movie.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();

    //  Users
    const users = await User.insertMany([
      { name: "Lina", email: "lina@email.com" },
      { name: "Ahmad", email: "ahmad@email.com" },
      { name: "Sara", email: "sara@email.com" },
    ]);

    //  Movies
    const movies = await Movie.insertMany([
      {
        title: "Interstellar",
        genre: "Sci-Fi",
        director: "Christopher Nolan",
        releaseYear: 2014,
        averageRating: 5,
      },
      {
        title: "The Dark Knight",
        genre: "Action",
        director: "Christopher Nolan",
        releaseYear: 2008,
        averageRating: 5,
      },
      {
        title: "Inception",
        genre: "Sci-Fi",
        director: "Christopher Nolan",
        releaseYear: 2010,
        averageRating: 4,
      },
      {
        title: "Titanic",
        genre: "Romance",
        director: "James Cameron",
        releaseYear: 1997,
        averageRating: 5,
      },
      {
        title: "Avatar",
        genre: "Fantasy",
        director: "James Cameron",
        releaseYear: 2009,
        averageRating: 4,
      },
    ]);

    //  Reviews
    await Review.insertMany([
      {
        movieId: movies[0]._id,
        userId: users[0]._id,
        comment: "Amazing movie!",
        rating: 5,
      },
      {
        movieId: movies[1]._id,
        userId: users[1]._id,
        comment: "Best Batman movie!",
        rating: 5,
      },
      {
        movieId: movies[2]._id,
        userId: users[2]._id,
        comment: "Mind-blowing!",
        rating: 4,
      },
      {
        movieId: movies[3]._id,
        userId: users[0]._id,
        comment: "Very emotional",
        rating: 5,
      },
      {
        movieId: movies[4]._id,
        userId: users[1]._id,
        comment: "Great visuals",
        rating: 4,
      },
    ]);

    console.log("Seed completed ✅");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();