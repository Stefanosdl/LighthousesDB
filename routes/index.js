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

            if(searchedLight.length != 0) {
                var today = new Date();
                var days = Math.floor((Math.abs(searchedLight[0].immersionDepthDate-today))/(1000*60*60*24));
            }

            if((searchedAuto == undefined || searchedAuto.length == 0) && (searchedLed == undefined || searchedLed.length == 0) && (searchedConstant == undefined || searchedConstant.length == 0) && (searchedLight == undefined || searchedLight.length == 0)) {
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
	const storeroom = await StoreRoom.findOne({});

	res.render("storeroom", { storeroom });
}));

router.get("/print", catchAsync(async (req, res, next) => {
    const searchedLed = await LedLight.find({}).populate("technicians");
    const searchedAuto = await AutoLight.find({}).populate("technicians");
    const searchedConstant = await ConstantLight.find({}).populate("technicians");
    const searchedLight = await LightBeacon.find({}).populate("technicians");
    
    res.render("print", { searchedAuto, searchedLed, searchedConstant, searchedLight });
}));

router.post("/print", catchAsync(async (req, res, next) => {
    const searchLed = await LedLight.find({}).populate("technicians");
    const searchAuto = await AutoLight.find({}).populate("technicians");
    const searchConstant = await ConstantLight.find({}).populate("technicians");
    const searchLight = await LightBeacon.find({}).populate("technicians");

    const auto = req.body.checkedAuto;
    const led = req.body.checkedLed;
    const constant = req.body.checkedConstant;
    const light = req.body.checkedLight;
    var searchedAuto = new Array();
    var searchedLed = new Array();
    var searchedConstant = new Array();
    var searchedLight = new Array();

    for (var item of searchAuto) {
        if(auto != undefined) {
            if (auto.includes(item.aef)) {
                searchedAuto.push(item);
            }
        }
    }
    for (var item of searchLed) {
        if(led != undefined) {
            if (led.includes(item.aef)) {
                searchedLed.push(item);
            }
        }
    }
    for (var item of searchConstant) {
        if(constant != undefined) {
            if (constant.includes(item.aef)) {
                searchedConstant.push(item);
            }
        }
    }
    for (var item of searchLight) {
        if(light != undefined) {
            if (light.includes(item.aef)) {
                searchedLight.push(item);
            }
        }
    }
    if(searchLight.length != 0) {
        var today = new Date();
        var days = Math.floor((Math.abs(searchLight[0].immersionDepthDate-today))/(1000*60*60*24));
    }

    if((searchAuto == undefined || searchAuto.length == 0) && (searchLed == undefined || searchLed.length == 0) && (searchConstant == undefined || searchConstant.length == 0) && (searchedLight == undefined || searchedLight.length == 0)) {
        req.flash("error", "Η αναζήτησή σας δεν είχε κανένα αποτέλεσμα!");
        res.redirect('/');
    }
    else {
        res.render("searchSpecific", { searchedAuto, searchedLed, searchedConstant, searchedLight, days });
    }
}));

router.post("/storeRoom", catchAsync(async (req, res) => {
	try {
		const storeroom = await StoreRoom.findOne({});
        
        if (storeroom == null) {
            const newstoreroom = new StoreRoom({});
            for (const item of req.body.accumulator) {
                if (item != "") {
                    newstoreroom.accumulators.push(item);
                }
            }
            for (const item of req.body.solarGenerator) {
                if (item != "") {
                    newstoreroom.solarGenerators.push(item);
                }
            }
            for (const item of req.body.head) {
                if (item != "") {
                    newstoreroom.heads.push(item);
                }
            }
            for (const item of req.body.lamp) {
                if (item != "") {
                    newstoreroom.lamps.push(item);
                }
            }
            for (const item of req.body.colour) {
                if (item != "") {
                    newstoreroom.colours.push(item);
                }
            }
            for (const item of req.body.lighter) {
                if (item != "") {
                    newstoreroom.lighters.push(item);
                }
            }
            for (const item of req.body.generatorSocket) {
                if (item != "") {
                    newstoreroom.generatorSockets.push(item);
                }
            }
            for (const item of req.body.torchSocket) {
                if (item != "") {
                    newstoreroom.torchSockets.push(item);
                }
            }
            for (const item of req.body.photocell) {
                if (item != "") {
                    newstoreroom.photocells.push(item);
                }
            }
            for (const item of req.body.accessory) {
                if (item != "") {
                    newstoreroom.accessorys.push(item);
                }
            }
            for (const item of req.body.alternator) {
                if (item != "") {
                    newstoreroom.alternators.push(item);
                }
            }
            for (const item of req.body.technician) {
                if (item != "") {
                    newstoreroom.technicians.push(item);
                }
            }
            for (const item of req.body.location) {
                if (item != "") {
                    newstoreroom.locations.push(item);
                }
            }
            for (const item of req.body.lightingMachineMan) {
                if (item != "") {
                    newstoreroom.lightingMachineMan.push(item);
                }
            }
            for (const item of req.body.lightingMachineType) {
                if (item != "") {
                    newstoreroom.lightingMachineType.push(item);
                }
            }
            for (const item of req.body.reflectorMan) {
                if (item != "") {
                    newstoreroom.reflectorMan.push(item);
                }
            }
            for (const item of req.body.reflectorType) {
                if (item != "") {
                    newstoreroom.reflectorType.push(item);
                }
            }
            for (const item of req.body.signsMan) {
                if (item != "") {
                    newstoreroom.signsMan.push(item);
                }
            }
            for (const item of req.body.signsType) {
                if (item != "") {
                    newstoreroom.signsType.push(item);
                }
            }
            for (const item of req.body.type) {
                if (item != "") {
                    newstoreroom.type.push(item);
                }
            }
            for (const item of req.body.stateriType) {
                if (item != "") {
                    newstoreroom.stateriType.push(item);
                }
            }
            for (const item of req.body.alysosType) {
                if (item != "") {
                    newstoreroom.alysosType.push(item);
                }
            }
            for (const item of req.body.agkyrioChainType) {
                if (item != "") {
                    newstoreroom.agkyrioChainType.push(item);
                }
            }
            for (const item of req.body.streptyrasType) {
                if (item != "") {
                    newstoreroom.streptyrasType.push(item);
                }
            }
            for (const item of req.body.navyKeyType) {
                if (item != "") {
                    newstoreroom.navyKeyType.push(item);
                }
            }
            for (const item of req.body.agkyrioType) {
                if (item != "") {
                    newstoreroom.agkyrioType.push(item);
                }
            }
            await newstoreroom.save();
        }
        else {
            for (const item of req.body.accumulator) {
                if (item != "") {
                    storeroom.accumulators.push(item);
                }
            }
            for (const item of req.body.solarGenerator) {
                if (item != "") {
                    storeroom.solarGenerators.push(item);
                }
            }
            for (const item of req.body.head) {
                if (item != "") {
                    storeroom.heads.push(item);
                }
            }
            for (const item of req.body.lamp) {
                if (item != "") {
                    storeroom.lamps.push(item);
                }
            }
            for (const item of req.body.colour) {
                if (item != "") {
                    storeroom.colours.push(item);
                }
            }
            for (const item of req.body.lighter) {
                if (item != "") {
                    storeroom.lighters.push(item);
                }
            }
            for (const item of req.body.generatorSocket) {
                if (item != "") {
                    storeroom.generatorSockets.push(item);
                }
            }
            for (const item of req.body.torchSocket) {
                if (item != "") {
                    storeroom.torchSockets.push(item);
                }
            }
            for (const item of req.body.photocell) {
                if (item != "") {
                    storeroom.photocells.push(item);
                }
            }
            for (const item of req.body.accessory) {
                if (item != "") {
                    storeroom.accessorys.push(item);
                }
            }
            for (const item of req.body.alternator) {
                if (item != "") {
                    storeroom.alternators.push(item);
                }
            }
            for (const item of req.body.technician) {
                if (item != "") {
                    storeroom.technicians.push(item);
                }
            }
            for (const item of req.body.location) {
                if (item != "") {
                    storeroom.locations.push(item);
                }
            }
            for (const item of req.body.lightingMachineMan) {
                if (item != "") {
                    storeroom.lightingMachineMan.push(item);
                }
            }
            for (const item of req.body.lightingMachineType) {
                if (item != "") {
                    storeroom.lightingMachineType.push(item);
                }
            }
            for (const item of req.body.reflectorMan) {
                if (item != "") {
                    storeroom.reflectorMan.push(item);
                }
            }
            for (const item of req.body.reflectorType) {
                if (item != "") {
                    storeroom.reflectorType.push(item);
                }
            }
            for (const item of req.body.signsMan) {
                if (item != "") {
                    storeroom.signsMan.push(item);
                }
            }
            for (const item of req.body.signsType) {
                if (item != "") {
                    storeroom.signsType.push(item);
                }
            }
            for (const item of req.body.type) {
                if (item != "") {
                    storeroom.type.push(item);
                }
            }
            for (const item of req.body.stateriType) {
                if (item != "") {
                    storeroom.stateriType.push(item);
                }
            }
            for (const item of req.body.alysosType) {
                if (item != "") {
                    storeroom.alysosType.push(item);
                }
            }
            for (const item of req.body.agkyrioChainType) {
                if (item != "") {
                    storeroom.agkyrioChainType.push(item);
                }
            }
            for (const item of req.body.streptyrasType) {
                if (item != "") {
                    storeroom.streptyrasType.push(item);
                }
            }
            for (const item of req.body.navyKeyType) {
                if (item != "") {
                    storeroom.navyKeyType.push(item);
                }
            }
            for (const item of req.body.agkyrioType) {
                if (item != "") {
                    storeroom.agkyrioType.push(item);
                }
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
