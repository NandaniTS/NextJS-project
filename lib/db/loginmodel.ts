import mongoose from "mongoose";

const LoginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide a email"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
  }
});

export default mongoose.models.LoginDetail || mongoose.model("LoginDetail", LoginSchema);
