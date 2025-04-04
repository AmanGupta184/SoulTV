import mongoose from "mongoose";

// Defining a new schema for the "Categories" collection in MongoDB
const categoriesSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    // Enabling timestamps to automatically track "createdAt" and "updatedAt"
    timestamps: true,
  }
);

export default mongoose.model("Categories", categoriesSchema);
