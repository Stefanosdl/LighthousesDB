const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const passport = require("passport")
const User = require("../models/user");
const LedLight = require("../models/ledlighthouses");
const AutoLight = require("../models/autolighthouses");
const ConstantLight = require("../models/constantlighthouses");
const LightBeacon = require("../models/lightbeacons");
const StoreRoom = require("../models/storeroom");

router.get("/", (req, res) => {
	res.render("index");
});

router.get("/login", (req, res) => {
	res.render("login");
});

router.post("/login", passport.authenticate("local", { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    const redirectUrl = req.session.returnTo || '/';
    delete req.session.returnTo;
    req.flash("success", "Επιτυχής σύνδεση");
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
        if (query) {
            const searchedAuto = await AutoLight.find({ $or:[ {aef: query}, {lighthouse: query}, {location: query} ]}).populate("technicians");
            const searchedLed = await LedLight.find({ $or:[ {aef: query}, {lighthouse: query}, {location: query} ]}).populate("technicians");
            const searchedConstant = await ConstantLight.find({ $or:[ {aef: query}, {lighthouse: query}, {location: query} ]}).populate("technicians");
            const searchedLight = await LightBeacon.find({ $or:[ {aef: query}, {lighthouse: query}, {location: query} ]}).populate("technicians");
            const storeroom = await StoreRoom.findOne({});
            var today = new Date();
            var days = Math.floor((Math.abs(searchedLight[0].immersionDepthDate-today))/(1000*60*60*24));

            if(searchedAuto == undefined || searchedAuto.length == 0 && searchedLed == undefined || searchedLed.length == 0 && searchedConstant == undefined || searchedConstant.length == 0 && searchedLight == undefined || searchedLight.length == 0) {
                req.flash("error", "Η αναζήτησή σας δεν είχε κανένα αποτέλεσμα!");
                res.redirect('/');
            }
            else {
                res.render("searchSpecific", { searchedAuto, searchedLed, searchedConstant, searchedLight, days});
            }
        }
        else {
            const searchedLed = await LedLight.find({}).populate("technicians");
            const searchedAuto = await AutoLight.find({}).populate("technicians");
            const searchedConstant = await ConstantLight.find({}).populate("technicians");
            const searchedLight = await LightBeacon.find({}).populate("technicians");
            res.render("search", { searchedAuto, searchedLed, searchedConstant, searchedLight });
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
    const constantSuggests = await ConstantLight.find({}).populate("technicians");
    const lightSuggests = await LightBeacon.find({}).populate("technicians");

	res.render("suggests", { autoSuggests, ledSuggests, constantSuggests, lightSuggests });
}));

router.get("/storeRoom", catchAsync(async (req, res, next) => {
	res.render("storeroom");
}));

router.post("/storeRoom", catchAsync(async (req, res) => {
	try {
		const storeroom = await StoreRoom.findOne({});
        
        if (storeroom == null) {
            const newstoreroom = new StoreRoom({});
            for (const item of req.body.accumulator) {
                newstoreroom.accumulators.push(item);
            }
            await newstoreroom.save();
        }
        else {
            for (const item of req.body.accumulator) {
                storeroom.accumulators.push(item);
            }
            await storeroom.save();
        }
	}
	catch(e) {
		req.flash("error", e.message);
		res.redirect('/storeroom');
	}
	
    req.flash("success", "Επιτυχής εισαγωγή!");
	res.redirect(`/`);		
}));

module.exports = router;
