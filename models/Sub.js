import mongoose from "mongoose";

const subSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  projects: {
    type: String,
    enum: ["Project 1", "Project 2"],
  },
  icon: {enum: "☁", type: String},
  note: {
    type: String,
  },
});

export default mongoose.models.Sub || mongoose.model("Sub", subSchema);
