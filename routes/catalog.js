const express = require("express");
const router = express.Router();
const House = require("../models/house");

// Show catalog
router.get("/", async (req, res) => {
    try {
        const houses = await House.find();
        res.render("catalog/catalog.ejs", {
            houses: houses
        });
    } catch (err) {
        res.redirect("/index");
    }
});

module.exports = router;
