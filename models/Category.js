import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

categorySchema.index({ name: 1, userId: 1 }, { unique: true });

export default mongoose.models.Category ||
  mongoose.model("Category", categorySchema);
