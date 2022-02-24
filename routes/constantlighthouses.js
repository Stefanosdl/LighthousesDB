const express = require("express");
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ConstantLight = require("../models/constantlighthouses");
const Technician = require("../models/technician");
const middleware = require("../utils/middleware");
const moment = require("moment");

router.get("/registerConstant", (req, res) => {
	res.render("registerConstant");
});

router.post("/registerConstant", catchAsync(async (req, res, next) => {
    try {
		const constantLighthouse = new ConstantLight({ ...req.body });
		
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
	
	res.render("searchConstant", { searchedConstant});
}));

router.get("/technicians/:id", catchAsync(async (req, res) => {
    const constantLightHouse = await ConstantLight.findById(req.params.id).populate("technicians").exec();
	
	res.render("constantTechnicians", { constantLightHouse });
}));

router.get("/technicians/new/:id", catchAsync(async (req, res) => {
    const constantLightHouse = await ConstantLight.findById(req.params.id).populate("technicians").exec();

	res.render("constantTechniciansNew", { constantLightHouse });
}));

router.post("/technicians/new/:id", catchAsync(async (req, res) => {
	try {
		const newTechnician = new Technician({...req.body.arr});
		const constantLightHouse = await ConstantLight.findById(req.params.id).populate("technicians").exec();
		await constantLightHouse.technicians.push(newTechnician);
		await constantLightHouse.save();
		await newTechnician.save();
		res.redirect(`/constantLightHouses/insertConstant/${req.params.id}`);
	}
	catch(e) {
		req.flash("error", e.message);
		res.redirect(`/constantLightHouse/technicians/new/${req.params.id}`);		
	}
}));

router.get("/insertConstant/:id", catchAsync(async (req, res) => {
    const constantLightHouse = await ConstantLight.findById(req.params.id);

	res.render("insertConstant", { constantLightHouse });
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
	res.redirect('/');
}));

router.get("/sum", catchAsync(async (req, res, next) => {
	const constantLightHouses = await ConstantLight.find({});
	var lamps = new Array();
	var colours = new Array();

	for (const item of constantLightHouses) {
		if(item.lamp != "") {
			lamps = lamps.concat(item.lamp);
		}
		if(item.colour != "") {
			colours = colours.concat(item.colour.toUpperCase());
		}
	}
	
	var coloursCount = {};
	colours.forEach(function(i) { coloursCount[i] = (coloursCount[i]||0) + 1;});
	var lampsCount = {};
	lamps.forEach(function(i) { lampsCount[i] = (lampsCount[i]||0) + 1;});

    res.render("constantSum", {lampsCount, coloursCount});
}));

module.exports = router;
