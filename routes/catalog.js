const express = require("express");
const router = express.Router();
const House = require("../models/house");

// Show catalog
router.get("/:page", async (req, res) => {
  try {
    const number = 9;
    const page = req.params.page;
    const houses = await House.find()
      .skip(number * page)
      .limit(number);
    const count = await House.countDocuments();
    res.render("main/catalog.ejs", {
      data: houses,
      current: page,
      pages: Math.ceil(count / number),
      url: "/catalog"
    });
  } catch (err) {
    res.redirect("/");
  }
});

router.get("/rooms/:page", async (req, res) => {
  try {
    const number = 9;
    const page = req.params.page;
    const houses = await House.find(
      { type: 1 },
      "id title address description tip wc available suite elevator dinningroom balcony gardin photo1 photo2 photo3 photo4"
    )
      .skip(number * page)
      .limit(number);
    const count = await House.countDocuments({ type: 1 });
    res.render("main/catalog.ejs", {
      data: houses,
      current: page,
      pages: Math.ceil(count / number),
      url: "/catalog/rooms"
    });
  } catch (err) {
    res.redirect("/");
  }
});

router.get("/apartments/:page", async (req, res) => {
  try {
    const number = 9;
    const page = req.params.page;
    const houses = await House.find(
      { type: 2 },
      "id title address description tip wc available suite elevator dinningroom balcony gardin photo1 photo2 photo3 photo4"
    )
      .skip(number * page)
      .limit(number);
    const count = await House.countDocuments({ type: 2 });
    res.render("main/catalog.ejs", {
      data: houses,
      current: page,
      pages: Math.ceil(count / number),
      url: "/catalog/apartments"
    });
  } catch (err) {
    res.redirect("/");
  }
});

module.exports = router;
