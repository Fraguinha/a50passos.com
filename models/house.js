const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  tip: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  wc: {
    type: Number,
    required: true
  },
  available: {
    type: Boolean,
    required: true
  },
  suite: {
    type: Boolean,
    required: true
  },
  elevator: {
    type: Boolean,
    required: true
  },
  dinningroom: {
    type: Boolean,
    required: true
  },
  balcony: {
    type: Boolean,
    required: true
  },
  gardin: {
    type: Boolean,
    required: true
  },
  photo1: {
    type: String,
    required: true
  },
  photo2: {
    type: String,
    required: true
  },
  photo3: {
    type: String,
    required: true
  },
  photo4: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("House", houseSchema);
