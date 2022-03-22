const express = require("express");
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ConstantLight = require("../models/constantlighthouses");
const Technician = require("../models/technician");
const StoreRoom = require("../models/storeroom");
const middleware = require("../utils/middleware");
const moment = require("moment");
const multer = require("multer");

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './photos/');
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

router.get("/registerConstant", catchAsync(async (req, res, next) => {
	const storeroom = await StoreRoom.findOne({});

	res.render("constantlights/registerConstant", { storeroom });
}));

router.post("/registerConstant", upload.single("file"), catchAsync(async (req, res, next) => {
    try {
		const constantLighthouse = new ConstantLight({ ...req.body });

		constantLighthouse.file = req.file.filename;
		moment.locale('el');
		constantLighthouse.dateModified = moment().format('LL');

        await constantLighthouse.save();
		req.flash("success", "Επιτυχής εγγραφή");
        res.redirect('/');
	}
	catch(e) {
		req.flash("error", e.message);
		res.redirect('/constantLighthouses/registerConstant');
	}
}));

router.post("/search/:id", catchAsync(async (req, res) => {
	const searchedConstant = await ConstantLight.find({_id: req.params.id}).populate("technicians");
	
	res.render("constantlights/searchConstant", { searchedConstant});
}));

router.get("/technicians/:id", catchAsync(async (req, res) => {
    const constantLightHouse = await ConstantLight.findById(req.params.id).populate("technicians").exec();
	
	res.render("constantlights/constantTechnicians", { constantLightHouse });
}));

router.get("/technicians/new/:id", catchAsync(async (req, res) => {
    const constantLightHouse = await ConstantLight.findById(req.params.id).populate("technicians").exec();
	const storeroom = await StoreRoom.findOne({});

	res.render("constantlights/constantTechniciansNew", { constantLightHouse, storeroom });
}));

router.post("/technicians/new/:id", catchAsync(async (req, res) => {
	try {
		const newTechnician = new Technician({...req.body.arr});
		const constantLightHouse = await ConstantLight.findById(req.params.id).populate("technicians").exec();
		await constantLightHouse.technicians.push(newTechnician);
		await constantLightHouse.save();
		await newTechnician.save();
		req.flash("success", "Επιτυχής εγγραφή");
		res.redirect(`/constantLightHouses/insertConstant/${req.params.id}`);
	}
	catch(e) {
		req.flash("error", e.message);
		res.redirect(`/constantLightHouse/technicians/new/${req.params.id}`);		
	}
}));

router.get("/insertConstant/:id", catchAsync(async (req, res) => {
    const constantLightHouse = await ConstantLight.findById(req.params.id);

	res.render("constantlights/insertConstant", { constantLightHouse });
}));

router.put("/insertConstant/:id", catchAsync(async (req, res) => {
	try {
		var id;
		const tmp = req.params.id.charAt(0);
		if(tmp === ":"){
			id = req.params.id.substring(1);
		}
		else{
			id = req.params.id;
		}
		const constantLightHouse = await ConstantLight.findById(id);

		if(req.body.aef != undefined && req.body.aef != null && req.body.aef != ""){
			constantLightHouse.aef = req.body.aef;
		}
		if(req.body.lighthouse != undefined && req.body.lighthouse != null && req.body.lighthouse != ""){
			constantLightHouse.lighthouse = req.body.lighthouse;
		}
		if(req.body.colour != undefined && req.body.colour != null && req.body.colour != ""){
			constantLightHouse.colour = req.body.colour;
		}
		if(req.body.sections != undefined && req.body.sections != null && req.body.sections != ""){
			constantLightHouse.sections = req.body.sections;
		}
		if(req.body.position != undefined && req.body.position != null && req.body.position != ""){
			constantLightHouse.position = req.body.position;
		}
		if(req.body.location != undefined && req.body.location != null && req.body.location != ""){
			constantLightHouse.location = req.body.location;
		}
		if(req.body.torchSocketDate != undefined && req.body.torchSocketDate != null && req.body.torchSocketDate != "" && !constantLightHouse.torchSocketDate.includes(req.body.torchSocketDate)){
			constantLightHouse.torchSocketDate.push(req.body.torchSocketDate);
		}
		if(req.body.accessory != undefined && req.body.accessory != null && req.body.accessory != ""){
			constantLightHouse.accessory.push(req.body.accessory);
		}
		if(req.body.accessoryDate != undefined && req.body.accessoryDate != null && req.body.accessoryDate != "" && !constantLightHouse.accessoryDate.includes(req.body.accessoryDate)){
			constantLightHouse.accessoryDate.push(req.body.accessoryDate);
		}
		if(req.body.lampDate != undefined && req.body.lampDate != null && req.body.lampDate != "" && !constantLightHouse.lampDate.includes(req.body.lampDate)){
			constantLightHouse.lampDate.push(req.body.lampDate);
		}
		if(req.body.torchSocket != undefined && req.body.torchSocket != null && req.body.torchSocket != ""){
			constantLightHouse.torchSocket = req.body.torchSocket;
		}
		if(req.body.lamp != undefined && req.body.lamp != null && req.body.lamp != ""){
			constantLightHouse.lamp = req.body.lamp;
		}
		
		moment.locale('el');
		constantLightHouse.dateModified = moment().format('LL');
		
		await constantLightHouse.save();
	}
	catch(e) {
		req.flash("error", e.message);
		res.redirect('/constantLightHouses/insertConstant/:id');
	}
	
    req.flash("success", "Επιτυχής ενημέρωση!");
	res.redirect(`/constantLighthouses/technicians/${req.params.id}`);		
}));

router.put("/deleteSuggest/:id", middleware.isLoggedIn, catchAsync(async (req, res, next) => {
    const constantSuggests = await ConstantLight.findById(req.params.id).populate({
		path: "technicians",
		match: { technician: { $eq: req.body.technician }, date: {$eq: req.body.date}, description: {$eq: req.body.description}, suggests: {$eq: req.body.suggests}},
	}).exec();
	constantSuggests.technicians[0].suggests = "";
	constantSuggests.technicians[0].save();
	await constantSuggests.save();
	req.flash("success", "Επιτυχής διαγραφή");
	res.redirect('/');
}));

router.get("/sum", catchAsync(async (req, res, next) => {
	const constantLightHouses = await ConstantLight.find({});
	var lamps = new Array();
	var colours = new Array();

	for (const item of constantLightHouses) {
		if(item.lamp != "" && item.lamp != undefined) {
			lamps = lamps.concat(item.lamp);
		}
		if(item.colour != "" && item.colour != undefined) {
			colours = colours.concat(item.colour.toUpperCase());
		}
	}
	
	var coloursCount = {};
	colours.forEach(function(i) { coloursCount[i] = (coloursCount[i]||0) + 1;});
	var lampsCount = {};
	lamps.forEach(function(i) { lampsCount[i] = (lampsCount[i]||0) + 1;});

    res.render("constantlights/constantSum", {lampsCount, coloursCount});
}));

module.exports = router;
