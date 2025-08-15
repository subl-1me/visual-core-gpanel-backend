import mongoose from "mongoose";

const stockSchema = new mongoose.Schema(
  {
    sizes: [
      {
        size: String,
        quantity: Number,
      },
    ],
    availableColors: {
      type: [String],
      required: true,
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: "At least one color must be available.",
      },
    },
    details: {
      name: String,
      description: String,
      price: Number,
      imageUrl: String,
      tier: {
        type: String,
        enum: ["SEASON", "DROP", "CUSTOM", "UNKNOWN"],
        default: "UNKNOWN",
      },
      media: [String],
    },
    status: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Stock", stockSchema);
