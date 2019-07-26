const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const House = require("../models/house");
const User = require("../models/user");

const { ensureAuthenticated } = require("../config/auth");

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/../public/uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + ".jpg");
    }
});
const upload = multer({ storage: storage });

const base = path.resolve(__dirname, '..');

// Show dashboard
router.get("/", ensureAuthenticated, (req, res) => {
    res.render("dashboard/dashboard.ejs");
});

// Dashboard addPhotos
router.post("/addPhoto1", ensureAuthenticated, upload.single('photo1'), async (req, res) => {
    res.status(201).redirect("/dashboard");
});

router.post("/addPhoto2", ensureAuthenticated, upload.single('photo2'), async (req, res) => {
    res.status(201).redirect("/dashboard");
});

router.post("/addPhoto3", ensureAuthenticated, upload.single('photo3'), async (req, res) => {
    res.status(201).redirect("/dashboard");
});

router.post("/addPhoto4", ensureAuthenticated, upload.single('photo4'), async (req, res) => {
    res.status(201).redirect("/dashboard");
});

// Dashboard clearImages
router.post("/clearImages", ensureAuthenticated, async (req, res) => {
    if (await fs.existsSync(base + "/public/uploads/photo1.jpg")) {
        await fs.unlinkSync(base + "/public/uploads/photo1.jpg");
    }
    if (await fs.existsSync(base + "/public/uploads/photo2.jpg")) {
        await fs.unlinkSync(base + "/public/uploads/photo2.jpg");
    }
    if (await fs.existsSync(base + "/public/uploads/photo3.jpg")) {
        await fs.unlinkSync(base + "/public/uploads/photo3.jpg");
    }
    if (await fs.existsSync(base + "/public/uploads/photo4.jpg")) {
        await fs.unlinkSync(base + "/public/uploads/photo4.jpg");
    }
    res.redirect("/dashboard");
});

// Dashboard addHouse
router.post("/addHouse", ensureAuthenticated, async (req, res) => {
    try {
        let id = req.body.id;
        if (!id) {
            id = Date.now();
        }
        const suite = req.body.suite ? true : false
        const elevator = req.body.elevator ? true : false
        const dinningroom = req.body.dinningroom ? true : false
        const balcony = req.body.balcony ? true : false
        const gardin = req.body.gardin ? true : false
        const house = new House({
            id: id,
            available: true,
            tip: req.body.tip,
            title: req.body.title,
            address: req.body.address,
            description: req.body.description,
            wc: req.body.wc,
            suite: req.body.suite ? true : false,
            elevator: req.body.elevator ? true : false,
            dinningroom: req.body.dinningroom ? true : false,
            balcony: req.body.balcony ? true : false,
            gardin: req.body.gardin ? true : false,
            photo1: "/images/" + id + "/photo1.jpg",
            photo2: "/images/" + id + "/photo2.jpg",
            photo3: "/images/" + id + "/photo3.jpg",
            photo4: "/images/" + id + "/photo4.jpg"
        });
        await fs.mkdirSync(base + "/public/images/" + id);
        await fs.renameSync(base + "/public/uploads/photo1.jpg", base + "/public/images/" + id + "/photo1.jpg");
        await fs.renameSync(base + "/public/uploads/photo2.jpg", base + "/public/images/" + id + "/photo2.jpg");
        await fs.renameSync(base + "/public/uploads/photo3.jpg", base + "/public/images/" + id + "/photo3.jpg");
        await fs.renameSync(base + "/public/uploads/photo4.jpg", base + "/public/images/" + id + "/photo4.jpg");
        await house.save();
        res.redirect("/dashboard");
    } catch (err) {
        res.redirect("/dashboard");
    }
});

// Dashboard toggleHouse
router.post("/toggleHouse", ensureAuthenticated, async (req, res) => {
    try {
        const house = await House.findOne({ id: req.body.id });
        if (house.available) {
            await House.findOneAndUpdate({ id: req.body.id }, { available: false }, { upsert: true }, (err) => console.error(err));
        } else {
            await House.findOneAndUpdate({ id: req.body.id }, { available: true }, { upsert: true }, (err) => console.error(err));
        }
        await house.save();
        res.redirect("/dashboard");
    } catch (err) {
        res.redirect("/dashboard");
    }
});

// Dashboard removeHouse
router.post("/removeHouse", ensureAuthenticated, async (req, res) => {
    try {
        await House.deleteOne({ id: req.body.id });
        await fs.unlinkSync(base + "/public/images/" + req.body.id + "/photo1.jpg");
        await fs.unlinkSync(base + "/public/images/" + req.body.id + "/photo2.jpg");
        await fs.unlinkSync(base + "/public/images/" + req.body.id + "/photo3.jpg");
        await fs.unlinkSync(base + "/public/images/" + req.body.id + "/photo4.jpg");
        await fs.rmdirSync(base + "/public/images/" + req.body.id);
        res.redirect("/dashboard");
    } catch (err) {
        res.redirect("/dashboard");
    }
});

// Dashboard editHouse
router.post("/editHouse", ensureAuthenticated, async (req, res) => {
    try {
        const house = await House.findOne();
        if (req.body.tip) {
            await House.findOneAndUpdate({ id: req.body.id }, { tip: req.body.tip }, { upsert: true }, (err) => console.error(err));
        }
        if (req.body.title) {
            await House.findOneAndUpdate({ id: req.body.id }, { title: req.body.title }, { upsert: true }, (err) => console.error(err));
        }
        if (req.body.address) {
            await House.findOneAndUpdate({ id: req.body.id }, { address: req.body.address }, { upsert: true }, (err) => console.error(err));
        }
        if (req.body.description) {
            await House.findOneAndUpdate({ id: req.body.id }, { description: req.body.description }, { upsert: true }, (err) => console.error(err));
        }
        if (req.body.wc) {
            await House.findOneAndUpdate({ id: req.body.id }, { wc: req.body.wc }, { upsert: true }, (err) => console.error(err));
        }
        if (req.body.checkbox) {
            await House.findOneAndUpdate({ id: req.body.id }, { suite: req.body.suite ? true : false }, { upsert: true }, (err) => console.error(err));
            await House.findOneAndUpdate({ id: req.body.id }, { elevator: req.body.elevator ? true : false }, { upsert: true }, (err) => console.error(err));
            await House.findOneAndUpdate({ id: req.body.id }, { dinningroom: req.body.dinningroom ? true : false }, { upsert: true }, (err) => console.error(err));
            await House.findOneAndUpdate({ id: req.body.id }, { balcony: req.body.balcony ? true : false }, { upsert: true }, (err) => console.error(err));
            await House.findOneAndUpdate({ id: req.body.id }, { gardin: req.body.gardin ? true : false }, { upsert: true }, (err) => console.error(err));
        }
        if (await fs.existsSync(base + "/public/uploads/photo1.jpg")) {
            await fs.unlinkSync(base + "/public/images/" + req.body.id + "/photo1.jpg");
            await fs.renameSync(base + "/public/uploads/photo1.jpg", base + "/public/images/" + req.body.id + "/photo1.jpg");
        }
        if (await fs.existsSync(base + "/public/uploads/photo2.jpg")) {
            await fs.unlinkSync(base + "/public/images/" + req.body.id + "/photo2.jpg");
            await fs.renameSync(base + "/public/uploads/photo2.jpg", base + "/public/images/" + req.body.id + "/photo2.jpg");
        }
        if (await fs.existsSync(base + "/public/uploads/photo3.jpg")) {
            await fs.unlinkSync(base + "/public/images/" + req.body.id + "/photo3.jpg");
            await fs.renameSync(base + "/public/uploads/photo3.jpg", base + "/public/images/" + req.body.id + "/photo3.jpg");
        }
        if (await fs.existsSync(base + "/public/uploads/photo4.jpg")) {
            await fs.unlinkSync(base + "/public/images/" + req.body.id + "/photo4.jpg");
            await fs.renameSync(base + "/public/uploads/photo4.jpg", base + "/public/images/" + req.body.id + "/photo4.jpg");
        }
        await house.save();
        res.redirect("/dashboard");
    } catch (err) {
        res.redirect("/dashboard");
    }
});

module.exports = router;
