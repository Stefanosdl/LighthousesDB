const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const passport = require("passport")
const User = require("../models/user");
const LedLight = require("../models/ledlighthouses");
const AutoLight = require("../models/autolighthouses");
const maxDates = require("../utils/calculateMaxDates");

router.get("/", (req, res) => {
	res.render("index");
});

router.get("/login", (req, res) => {
	res.render("login");
});

router.post("/login", passport.authenticate("local", { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    const redirectUrl = req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
});

router.get("/register", (req, res) => {
	res.render("register");
});

router.post("/register", (req,res) => {
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
    if(err){
        req.flash("error", err.message);
        return res.render("register", {error: err.message});
    }
    passport.authenticate("local")(req, res,() => {
        req.flash("success", "Επιτυχής εγγραφή!");
        res.redirect("/");
    });
   });
});
router.get("/logout", (req,res) =>{
    req.logout();
    req.flash("success","Επιτυχής αποσύνδεση");
    res.redirect("/");
});

router.get("/search", catchAsync(async (req, res, next) => {
	try {
        const query = req.query.q;
        var maxCountLed = 0;
        var maxCountAuto = 0;
        if (query){
            const searchedLed = await LedLight.find({ $or:[ {aef: query}, {lighthouse: query} ]}).populate("technicians");
            if (searchedLed != undefined && searchedLed.length != 0) {
                maxCountLed = maxDates.getMostDatesLed(searchedLed[0]);
            }
            if(searchedLed == undefined || searchedLed.length == 0) {
                const searchedAuto = await AutoLight.find({ $or:[ {aef: query}, {lighthouse: query} ]}).populate("technicians");
                if (searchedAuto != undefined && searchedAuto.length != 0) {
                    maxCountAuto = maxDates.getMostDatesAuto(searchedAuto[0]);
                }
                
                if(searchedAuto == undefined || searchedAuto.length == 0) {
                    req.flash("error", "Η αναζήτησή σας δεν είχε κανένα αποτέλεσμα!");
                    res.redirect('/');
                }
                else {
                    res.render("searchAuto", { searchedAuto , maxCountAuto});
                }
            }
            else {
                res.render("searchLed", { searchedLed , maxCountLed});
            }
        }
        else {
            res.render("index");
        }

    }
    catch (e) {
        req.flash("error", e.message);
        res.redirect('/');
    }
}));

router.get("/suggestedWorks", catchAsync(async (req, res, next) => {
    const autoSuggests = await AutoLight.find({}).populate("technicians");
    const ledSuggests = await LedLight.find({}).populate("technicians");
	res.render("suggests", { autoSuggests, ledSuggests });
}));


module.exports = router;
