import Pins from "../models/pin.model.js";

export const getPins = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.cursor) || 0;
    const LIMIT = 21;

    const pins = await Pins.find()
      .sort({ createdAt: -1 })
      .skip(pageNumber * LIMIT)
      .limit(LIMIT)
      .lean();

    const hasNextPage = pins.length === LIMIT;

    await new Promise((resolve) => setTimeout(resolve, 3000));

    res.status(200).json({
      pins,
      nextCursor: hasNextPage ? pageNumber + 1 : null,
    });
  } catch (error) {
    console.error("Error fetching pins:", error);
    res.status(500).json({ message: "Failed to fetch pins" });
  }
};
