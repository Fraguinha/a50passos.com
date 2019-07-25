const express = require("express");
const router = express.Router();
const House = require("../models/house");

// Show house
router.get("/:id", async (req, res) => {
    try {
        const house = await House.find({ id: req.params.id }, "id available tip title address description photo1 photo2 photo3 photo4");
        res.render("house/house.ejs", {
            house: house[0]
        });
    } catch (err) {
        res.redirect("/index");
    }
});

module.exports = router;
