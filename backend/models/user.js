import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    user: { type: String },
  },
  { timestamps: true }
);

const AppUser = mongoose.model("AppUser", userSchema);

export default AppUser;
