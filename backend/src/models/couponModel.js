import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true }, 
  discountPercentage: { type: Number, required: true }, 
  applicableBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }], 
  expiresAt: { type: Date, required: true }, 
  active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("Coupon", couponSchema);
