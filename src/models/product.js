import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    required: true,
    enum: ["ELECTRONICS", "FASHION", "BOOKS", "COSMETICS", "OTHERS"],
  },
  imageURL: { type: String },
  thumbNailURL: { type: String },
  variants: [{ type: String }],
  lastUpdated: { type: Date }
});

export default mongoose.model("Products", productSchema);
