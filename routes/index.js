const express = require("express");
const router = express.Router();

const Meta = require("../models/meta-model");

// Show homepage
router.get("/", async (req, res) => {
  const meta = await Meta.find();
  res.render("index.ejs", {
    meta: meta[0]
  });
});

module.exports = router;
