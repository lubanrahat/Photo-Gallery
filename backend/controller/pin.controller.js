import Pins from "../models/pin.model.js";
import mongoose from "mongoose";
import User from "../models/user.model.js";

export const getPins = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.cursor) || 0;
    const search = req.query.search;
    const LIMIT = 21;

    const pins = await Pins.find(
      search
        ? {
            $or: [
              { title: { $regex: search, $options: "i" } },
              { tag: { $in: [search] } },
            ],
          }
        : {}
    )
      .sort({ createdAt: -1 })
      .limit(LIMIT)
      .skip(pageNumber * LIMIT);

    const hasNextPage = pins.length === LIMIT;
    const total = await Pins.countDocuments();

    res.status(200).json({
      pins,
      nextCursor: hasNextPage ? pageNumber + 1 : null,
      total,
    });
  } catch (error) {
    console.error("Error fetching pins:", error);
    res.status(500).json({ message: "Failed to fetch pins" });
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
    res.status(500).json({ message: "Failed to fetch pin" });
  }
};
