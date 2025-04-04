import mongoose from "mongoose";

// Defining an asynchronous function to connect to the MongoDB database
export const connectDB = async () => {
  try {
    // Attempting to establish a connection to MongoDB using the URI from environment variables
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true, // Use the new URL parser to avoid deprecation warnings
      useUnifiedTopology: true, // Use the new unified topology engine for improved handling of server discovery and monitoring
    });

    console.log("Mongodb connected..");
  } catch (error) {
    console.log(`Error from db : ${error.message}`);

    // Exit the process with a failure code (1) if the connection fails
    process.exit(1);
  }
};
