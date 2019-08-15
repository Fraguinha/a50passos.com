const mongoose = require("mongoose");

const metaSchema = new mongoose.Schema({
  managed: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Meta", metaSchema);
