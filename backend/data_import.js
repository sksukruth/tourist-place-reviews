import dotenv from "dotenv";
dotenv.config();

import places from "./data/places.js"
import connectDB from  "./config/db.js"
import Place from "./models/places.js"

console.log(process.env.TOURREVIEWS_DB_URI)
connectDB();

const importData = async () => {
  try {
    await Place.deleteMany({});

    await Place.insertMany(places);

    console.log("Data Import Success");

    process.exit();
  } catch (error) {
    console.error("Error with data import", error);
    process.exit(1);
  }
};

importData();