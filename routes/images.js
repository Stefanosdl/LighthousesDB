const express = require("express");
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const LedLight = require("../models/ledlighthouses");
const AutoLight = require("../models/autolighthouses");
const ConstantLight = require("../models/constantlighthouses");
const LightBeacon = require("../models/lightbeacons");

const multer = require("multer");

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './release-builds/LighthousesDB-win32-ia32/photos/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});

var fileFilter = (req, file, cb) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg"){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
    
};

var upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

router.get("/index", catchAsync(async (req, res, next) => {
    const searchedLed = await LedLight.find({}).populate("technicians");
    const searchedAuto = await AutoLight.find({}).populate("technicians");
    const searchedConstant = await ConstantLight.find({}).populate("technicians");
    const searchedLight = await LightBeacon.find({}).populate("technicians");
    
    res.render("images/index", { searchedAuto, searchedLed, searchedConstant, searchedLight });
}));

router.get("/search", catchAsync(async (req, res, next) => {
    try {
        const query = req.query.q;
        if (query) {
            const searchedAuto = await AutoLight.find({ $or:[ {aef: query}, {lighthouse: query}, {location: query} ]}).populate("technicians");
            const searchedLed = await LedLight.find({ $or:[ {aef: query}, {lighthouse: query}, {location: query} ]}).populate("technicians");
            const searchedConstant = await ConstantLight.find({ $or:[ {aef: query}, {lighthouse: query}, {location: query} ]}).populate("technicians");
            const searchedLight = await LightBeacon.find({ $or:[ {aef: query}, {lighthouse: query}, {location: query} ]}).populate("technicians");

            if((searchedAuto == undefined || searchedAuto.length == 0) && (searchedLed == undefined || searchedLed.length == 0) && (searchedConstant == undefined || searchedConstant.length == 0) && (searchedLight == undefined || searchedLight.length == 0)) {
                req.flash("error", "Η αναζήτησή σας δεν είχε κανένα αποτέλεσμα!");
                res.redirect('/');
            }
            else {
                res.render("images/search", { searchedAuto, searchedLed, searchedConstant, searchedLight});
            }
        }
    }
    catch (e) {
        req.flash("error", e.message);
        res.redirect('/');
    }
}));

module.exports = router;
