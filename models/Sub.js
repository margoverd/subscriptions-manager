import mongoose from "mongoose";

const subSchema = new mongoose.Schema(
  {
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
    unit: {
      type: String,
      default: "/mo",
    },
    projects: [
      {
        type: String,
        trim: true,
      },
    ],
    icon: {
      type: String,
      default: "☁",
    },
    note: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Sub || mongoose.model("Sub", subSchema);
