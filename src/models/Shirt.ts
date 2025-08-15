import mongoose from "mongoose";

const shritSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    identificator: {
      type: String,
      required: true,
      unique: true,
    },
    tier: {
      type: String,
      enum: ["SEASON", "DROP", "CUSTOM", "UNKNOWN"],
      default: "UNKNOWN",
    },
    media: {
      type: [String],
      default: [],
    },
    size: {
      type: String,
      enum: ["S", "M", "L", "XL", "XXL"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Shirt", shritSchema);
