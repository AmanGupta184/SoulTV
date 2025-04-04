import express from "express";
import multer from "multer";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import bodyParser from "body-parser";
import fileUpload from "../Controllers/FileController.js";

// Create an Express app instance to set up the server and routes
const user = express();

// Get the current file's URL and convert it to a file path
const __filename = fileURLToPath(import.meta.url);

// Get the directory name of the current file using the file path obtained above
const __dirname = dirname(__filename);

// Use 'body-parser' to parse URL-encoded form data (like data from a form submission)
user.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like images, styles, etc.) from the "public" directory
user.use(express.static(path.resolve(__dirname, "public")));

var uploader = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 1000 * 1024 * 1024, files: 1, fields: 1 },
});

user.post("/upload", uploader.single("file"), fileUpload);// - Use 'uploader.single("file")' to process a single file upload with the form field name "file"

export default user;
