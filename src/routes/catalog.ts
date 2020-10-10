import express from "express";
import House from "../models/house-model";

const router = express.Router();

// Show catalog
router.get("/:page", async (req, res) => {
  try {
    const numberItems = 9;
    const paginationNumber = 5;
    const page = Number(req.params.page);
    const houses = await House.find()
      .sort({ date: -1 })
      .skip(numberItems * page)
      .limit(numberItems);
    const count = await House.countDocuments();
    res.render("main/catalog.ejs", {
      data: houses,
      current: page,
      pagination: paginationNumber,
      pages: Math.ceil(count / numberItems),
      url: "/catalog"
    });
  } catch (err) {
    res.redirect("/");
  }
});

router.get("/rooms/:page", async (req, res) => {
  try {
    const numberItems = 9;
    const paginationNumber = 5;
    const page = Number(req.params.page);
    const houses = await House.find({ type: 1 })
      .sort({ date: -1 })
      .skip(numberItems * page)
      .limit(numberItems);
    const count = await House.countDocuments({ type: 1 });
    res.render("main/catalog.ejs", {
      data: houses,
      current: page,
      pagination: paginationNumber,
      pages: Math.ceil(count / numberItems),
      url: "/catalog/rooms"
    });
  } catch (err) {
    res.redirect("/");
  }
});

router.get("/apartments/:page", async (req, res) => {
  try {
    const numberItems = 9;
    const paginationNumber = 5;
    const page = Number(req.params.page);
    const houses = await House.find({ type: 2 })
      .sort({ date: -1 })
      .skip(numberItems * page)
      .limit(numberItems);
    const count = await House.countDocuments({ type: 2 });
    res.render("main/catalog.ejs", {
      data: houses,
      current: page,
      pagination: paginationNumber,
      pages: Math.ceil(count / numberItems),
      url: "/catalog/apartments"
    });
  } catch (err) {
    res.redirect("/");
  }
});

export = router;
