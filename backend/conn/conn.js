const mongoose = require("mongoose");
require("dotenv").config();


const conn = async () => {
  try {
    const response = await mongoose.connect(`${process.env.MONGO_URL}`);
    if (response) {
      console.log("MongoDB connected successfully");
    }
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
};

conn();
