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
    media: [
      {
        public_id: { type: String },
        url: { type: String },
      },
    ],
    size: {
      type: String,
      enum: ["S", "M", "L", "XL", "XXL"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Shirt", shritSchema);
