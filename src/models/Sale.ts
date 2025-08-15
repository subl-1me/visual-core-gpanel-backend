import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["AUTOMATIC", "MANUAL"], required: true },
    status: {
      type: String,
      enum: ["REQUESTED", "DELIVERED", "ERROR", "IN PROCESS"],
      required: true,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shirt",
        required: true,
      },
    ],
    paymentMethod: { type: String, required: true },
    additionalNotes: { type: String },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Sale", saleSchema);
