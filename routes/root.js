const express = require("express");
const router = express.Router();

// Show homepage
router.get("/", (req, res) => {
  res.render("index.ejs", {
    data: []
  });
});

module.exports = router;
