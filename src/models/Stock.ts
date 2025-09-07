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
      media: [
        {
          public_id: { type: String },
          url: { type: String },
        },
      ],
      default: [],
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

export interface Media {
  public_id: string;
  url: string;
}

export interface StockDetails {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  tier: "SEASON" | "DROP" | "CUSTOM" | "UNKNOWN";
  media: Media[];
}

export interface Stock extends Document {
  sizes: { size: string; quantity: number }[];
  availableColors: string[];
  details: StockDetails;
  status: string;
  total: number;
}

export default mongoose.model<Stock>("Stock", stockSchema);
