import express from "express";
import Meta from "../models/meta-model";

const router = express.Router();

// Show homepage
router.get("/", async (req, res) => {
  const meta = await Meta.find();
  res.render("index.ejs", {
    meta: meta[0]
  });
});

export = router;
