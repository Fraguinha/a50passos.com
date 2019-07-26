const express = require("express");
const router = express.Router();
const passport = require("passport");

// Show login
router.get("/", (req, res) => {
    res.render("login.ejs");
});

// Handle login
router.post("/", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/login"
    })(req, res, next);
});

// Logout
router.post("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

module.exports = router;
