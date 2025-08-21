import Coupon from "../models/couponModel.js";

// Create a new coupon
export const createCoupon = async (req, res) => {
  try {
    const { code, discountPercentage, applicableBooks } = req.body;

    // expire after 2 days
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 2);

    const coupon = new Coupon({
      code: code.toUpperCase(),
      discountPercentage,
      applicableBooks: applicableBooks || [],
      expiresAt
    });

    await coupon.save();
    res.status(201).json({ message: "Coupon created successfully", coupon });
  } catch (error) {
    console.error("Error creating coupon:", error);
    res.status(500).json({ message: "Failed to create coupon" });
  }
};

// Apply coupon
export const applyCoupon = async (req, res) => {
  try {
    const { couponCode, bookId, price } = req.body;

    const coupon = await Coupon.findOne({ code: couponCode.toUpperCase(), active: true });

    if (!coupon) {
      return res.status(400).json({ message: "Invalid coupon" });
    }

    if (coupon.expiresAt < new Date()) {
      return res.status(400).json({ message: "Coupon expired" });
    }

    if (coupon.applicableBooks.length > 0 && !coupon.applicableBooks.includes(bookId)) {
      return res.status(400).json({ message: "Coupon not valid for this book" });
    }

    const discountAmount = (price * coupon.discountPercentage) / 100;
    const finalPrice = price - discountAmount;

    res.json({ originalPrice: price, discount: coupon.discountPercentage, finalPrice });
  } catch (error) {
    console.error("Error applying coupon:", error);
    res.status(500).json({ message: "Failed to apply coupon" });
  }
};
