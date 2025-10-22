import Pins from "../models/pin.model.js";

export const getPins = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.cursor) || 0;
    const search = req.query.search;
    const LIMIT = 21;

    const pins = await Pins.find(
      search
        ? {
            $or: [
              { title: { $regex: search, $option: "i" } },
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

