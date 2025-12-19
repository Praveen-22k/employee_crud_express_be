const mongoose = require("mongoose");
require("dotenv").config();

const Connectdb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL);

    console.log("DB Name :", connect.connection.name);
    console.log("DB Host :", connect.connection.host);
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
};

module.exports = Connectdb;
