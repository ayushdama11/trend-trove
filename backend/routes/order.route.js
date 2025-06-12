import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import Order from "../models/order.model.js";

const router = express.Router();

// Get all orders for the current user
router.get("/", protectRoute, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate({
                path: 'products.product',
                select: 'name image price'
            })
            .sort({ createdAt: -1 }); // Sort by newest first

        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
});

export default router; 