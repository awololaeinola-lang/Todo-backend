const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    dueDate: Date,

    completed: {
      type: Boolean,
      default: false,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", TodoSchema);
