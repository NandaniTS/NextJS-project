import mongoose from "mongoose";

async function dbConnect() {
  await mongoose
    .connect(
      "mongodb+srv://nandanisethiya92:nandani123@cluster0.85bg2r5.mongodb.net/newdb"
    )
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
}

export default dbConnect;
