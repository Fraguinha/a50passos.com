const express = require("express");
const router = express.Router();
const House = require("../models/house");

// Show catalog
router.get("/", async (req, res) => {
  try {
    const houses = await House.find();
    res.render("main/catalog.ejs", {
      data: houses
    });
  } catch (err) {
    res.redirect("/");
  }
});

router.get("/rooms", async (req, res) => {
  try {
    const houses = await House.find(
      { type: 1 },
      "id title address description tip wc available suite elevator dinningroom balcony gardin photo1 photo2 photo3 photo4"
    );
    res.render("main/catalog.ejs", {
      data: houses
    });
  } catch (err) {
    res.redirect("/");
  }
});

router.get("/apartments", async (req, res) => {
  try {
    const houses = await House.find(
      { type: 2 },
      "id title address description tip wc available suite elevator dinningroom balcony gardin photo1 photo2 photo3 photo4"
    );
    res.render("main/catalog.ejs", {
      data: houses
    });
  } catch (err) {
    res.redirect("/");
  }
});

module.exports = router;
