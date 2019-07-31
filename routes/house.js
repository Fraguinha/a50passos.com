const express = require("express");
const router = express.Router();
const House = require("../models/house");

// Show house
router.get("/:id", async (req, res) => {
  try {
    const house = await House.find(
      { id: req.params.id },
      "id title address description tip wc available suite elevator dinningroom balcony gardin photo1 photo2 photo3 photo4"
    );

    res.render("main/house.ejs", {
      data: house[0]
    });
  } catch (err) {
    res.redirect("/");
  }
});

module.exports = router;
