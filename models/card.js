const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },

  link: {
    type: String,
    required: true,
  },

  owner: {
    ref: "user",
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  likes: {
    ref: "user",
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("card", cardSchema);
