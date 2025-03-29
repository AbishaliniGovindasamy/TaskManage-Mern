const mongoose = require("mongoose");
require("dotenv").config();

const conn = async () => {
  try {
    console.log("MONGO_URL from .env:", process.env.MONGO_URL); // Debugging
    const response = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (response) {
      console.log("MongoDB connected successfully");
    }
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
};

conn();
