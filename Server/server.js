import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./Config/db.js";
import userRouter from "./Routes/UserRouter.js";
import movieRouter from "./Routes/MoviesRouter.js";
import fileRouter from "./Routes/FileRouter.js";
import categoriesRouter from './Routes/CategoriesRouter.js';
import { errorHandler } from "./Middlewares/errorMiddleware.js";
import { v2 as cloudinary } from "cloudinary";

// Loading environment variables from the .env file
dotenv.config();


//cloudinary config
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});


// Creating an instance of an Express application
const app = express();

// Using the CORS middleware to allow requests from different domains (cross-origin resource sharing)
app.use(cors());

// Middleware to parse incoming JSON data in requests
app.use(express.json());

// Calling the connectDB function to establish a connection to the MongoDB database
connectDB();

// Defining the main route for the API (the root route)
app.get("/", (req, res) => {
  res.send("API is running..");
});

// Defining other routes for the application
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/categories",categoriesRouter);
app.use("/api",fileRouter);

// Using a custom error handler middleware to catch and handle any errors
app.use(errorHandler);

// Setting the port for the server to listen on, defaulting to 8000 if not specified in environment variables
const PORT = Number(process.env.PORT) || 8000;

// Starting the server and listening on the specified port
app.listen(PORT, () => {
  console.log(`server is running in ${PORT}`);
});
