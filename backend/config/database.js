const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectDb = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Database connection established");
    })
    .catch((err) => console.error("Error connecting to database"));
};

module.exports = connectDb;
