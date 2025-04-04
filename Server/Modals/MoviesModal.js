// Importing mongoose library to define schemas and models for MongoDB
import mongoose from "mongoose";

// Defining the schema for reviews associated with movies
const reviewSchema = mongoose.Schema(
  {
    userName: {
      type: String, // The "userName" is a string
      required: true, // The "userName" is required to be provided
    },
    userImage: {
      type: String, // The "userImage" is a string (e.g., a URL to an image)
    },
    rating: {
      type: Number, // The "rating" is a number (e.g., a rating from 1-5)
      required: true, // The "rating" is required to be provided
    },
    comment: {
      type: String, // The "comment" is a string (the text of the review)
      required: true, // The "comment" is required to be provided
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId, // This is a reference to the "User" collection
      ref: "User", // Refers to the "User" model, linking the review to a user
      required: true, // The "userId" is required to associate the review with a user
    },
  },
  {
    // Enabling timestamps to automatically track "createdAt" and "updatedAt"
    timestamps: true,
  }
);

// Defining the schema for movies
const movieSchema = mongoose.Schema(
  {
    // Defining the "userId" field to associate the movie with a user
    userId: {
      type: mongoose.Schema.Types.ObjectId, // This is a reference to the "User" collection
      ref: "User", // Refers to the "User" model, linking the movie to a user
    },
    name: {
      type: String, // The "name" is a string (e.g., movie title)
      required: true, // The "name" is required to be provided
    },
    desc: {
      type: String, // The "desc" is a string (description of the movie)
      required: true, // The "desc" is required to be provided
    },
    titleImage: {
      type: String, // The "titleImage" is a string (URL or file path of the image)
      required: true, // The "titleImage" is required to be provided
    },
    image: {
      type: String, // The "image" is a string (URL or file path of the image)
      required: true, // The "image" is required to be provided
    },
    category: {
      type: String, // The "category" is a string (e.g., "Action", "Comedy")
      required: true, // The "category" is required to be provided
    },
    language: {
      type: String, // The "language" is a string (e.g., "English", "Spanish")
      required: true, // The "language" is required to be provided
    },
    year: {
      type: Number, // The "year" is a number (e.g., 2023)
      required: true, // The "year" is required to be provided
    },
    time: {
      type: Number, // The "time" is a number (e.g., duration of the movie in minutes)
      required: true, // The "time" is required to be provided
    },
    video: {
      type: String, // The "video" is a string (URL or file path for the movie video)
    },
    rate: {
      type: Number, // The "rate" is a number (e.g., rating of the movie)
      required: true, // The "rate" is required to be provided
      default: 0, // Default value for "rate" is 0
    },
    numberOfReviews: {
      type: Number, // The "numberOfReviews" is a number (e.g., count of reviews)
      required: true, // The "numberOfReviews" is required to be provided
      default: 0, // Default value for "numberOfReviews" is 0
    },
    reviews: [reviewSchema], // This will store the reviews for the movie (each review follows the reviewSchema)
  },
  {
    // Enabling timestamps to automatically track "createdAt" and "updatedAt"
    timestamps: true,
  }
);

export default mongoose.model("Movies", movieSchema);
