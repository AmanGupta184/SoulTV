import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please add a full name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      trim: true, // Removes leading and trailing whitespaces from the email
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: [6, "Password must be at least 6 characters"], // The "password" must have a minimum length of 6 characters
    },
    image: {
      type: "String",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    likedMovies: [
      {
        type: mongoose.Schema.Types.ObjectId, // The field contains an array of ObjectIds (MongoDB references)
        ref: "Movies", // This indicates that the ObjectIds reference the "Movies" collection
      },
    ],
  },
  {
    // Enabling timestamps to automatically track "createdAt" and "updatedAt"
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
