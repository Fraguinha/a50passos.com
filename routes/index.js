const express = require("express");
const router = express.Router();

// Show homepage
router.get("/", (req, res) => {
    res.render("index.ejs");
});

router.get("/index", (req, res) => {
    res.render("index.ejs");
});

module.exports = router;
