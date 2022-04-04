const express = require("express");
const path = require("path");
const fs = require("fs");
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
            const searchedAuto = await AutoLight.findOne({aef: query}).populate("technicians");
            const searchedLed = await LedLight.findOne({aef: query}).populate("technicians");
            const searchedConstant = await ConstantLight.findOne({aef: query}).populate("technicians");
            const searchedLight = await LightBeacon.findOne({aef: query}).populate("technicians");
            
            const autoIm = new Array();
            const ledIm = new Array();
            const constantIm = new Array();
            const lightIm = new Array();
            var tmp = "";
            var p = path.join(__dirname, '../../../photos/');

            if(searchedAuto != undefined) {
                fs.readdirSync(p + searchedAuto.aef).forEach((file) => {
                    tmp = (p + searchedAuto.aef + "/").concat(file);
                    autoIm.push(tmp)
                });
            }
            if(searchedLed != undefined) {
                fs.readdirSync(p + searchedLed.aef).forEach((file) => {
                    tmp = (p + searchedLed.aef + "/").concat(file);
                    ledIm.push(tmp)
                });
            }
            if(searchedConstant != undefined) {
                fs.readdirSync(p + searchedConstant.aef).forEach((file) => {
                    tmp = (p + searchedConstant.aef + "/").concat(file);
                    constantIm.push(tmp)
                });
            }
            if(searchedLight != undefined) {
                fs.readdirSync(p + searchedLight.aef).forEach((file) => {
                    tmp = (p + searchedLight.aef + "/").concat(file);
                    lightIm.push(tmp)
                });
            }

            if((searchedAuto == undefined || searchedAuto.length == 0) && (searchedLed == undefined || searchedLed.length == 0) && (searchedConstant == undefined || searchedConstant.length == 0) && (searchedLight == undefined || searchedLight.length == 0)) {
                req.flash("error", "Η αναζήτησή σας δεν είχε κανένα αποτέλεσμα!");
                res.redirect('/images/index');
            }
            else {
                res.render("images/search", { autoIm, ledIm, constantIm, lightIm});
            }
        }
        else {
            req.flash("error", "Εισάγετε κάποιο ΑΕΦ προς αναζήτηση!");
            res.redirect('/images/index');
        }
    }
    catch (e) {
        req.flash("error", e.message);
        res.redirect('/');
    }
}));

module.exports = router;
