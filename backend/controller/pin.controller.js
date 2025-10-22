import Pins from "../models/pin.model.js";
import mongoose from "mongoose";
import User from "../models/user.model.js";

export const getPins = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const search = req.query.search;
    const { userId } = req.params;
    const LIMIT = 21;

    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    } else if (userId) {
      query.user = userId;
    }

    const pins = await Pins.find(query)
      .sort({ createdAt: -1 })
      .limit(LIMIT)
      .skip(page * LIMIT)
      .populate("user", "username img displayName");

    const total = await Pins.countDocuments(query);
    const hasNextPage = pins.length === LIMIT;

    res.status(200).json({
      pins,
      nextCursor: hasNextPage ? page + 1 : null,
      total,
    });
  } catch (error) {
    console.error("❌ Error fetching pins:", error);
    res.status(500).json({ message: "Failed to fetch pins", error: error.message });
  }
};

export const getPin = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid pin ID" });
    }

    const pin = await Pins.findById(id).populate(
      "user",
      "username img displayName"
    );

    if (!pin) {
      return res.status(404).json({ message: "Pin not found" });
    }

    res.status(200).json(pin);
  } catch (error) {
    console.error("❌ Error fetching pin:", error.message);
    res.status(500).json({ message: "Failed to fetch pin", error: error.message });
  }
};
