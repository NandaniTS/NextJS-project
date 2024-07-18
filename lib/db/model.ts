import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
  id:{
    type:Number
  },
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a price"],
  },
  review: {
    type: Number,
    required: [true, "Please provide a review rating"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
});



export default mongoose.models.Data || mongoose.model("Data", DataSchema);
