const mongoose = require("mongoose");
require("dotenv").config();
const dbURI = process.env.DB_URI;

const dbConnect = () => {
  mongoose.connection.on("open", function () {
    console.log("Connected to mongoDB");
  });

  mongoose.connection.on("error", function () {
    console.log("Could not connect to mongoDB");
  });

  mongoose.connect(dbURI);
};

module.exports = dbConnect;
