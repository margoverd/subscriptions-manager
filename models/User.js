import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  image: {
    type: String,
  },
  subs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sub",
    },
  ],
});

export default mongoose.models.User || mongoose.model("User", userSchema);
