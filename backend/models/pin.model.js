import mongoose, { Schema } from "mongoose";

const pinsSchema = new Schema(
  {
    media: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: [String],
    },
    board: {
      type: Schema.Types.ObjectId,
      ref: "Board",
    },
    tag: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Pins = mongoose.model("Pins", pinsSchema);

export default Pins;
