
import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },

    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    issueDate: {
      type: Date,
      default: null,
    },

    dueDate: {
      type: Date,
      default: null,
    },

    returnDate: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: [
        "requested",
        "issued",
        "returned",
        "rejected",
      ],
      default: "requested",
    },

    fine: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Issue", issueSchema);

