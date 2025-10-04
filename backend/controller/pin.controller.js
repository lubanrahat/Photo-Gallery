import Pins from "../models/pin.model.js";

export const getPins = async (req, res) => {
  const pageNumber = Number(req.query.cursor);
  const LIMIT = 21;
  const pins = await Pins.find()
    .limit(LIMIT)
    .skip(pageNumber * LIMIT);
  res.status(200).json(pins);
};
