const express = require("express");
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const LedLight = require("../models/ledlighthouses");
const Technician = require("../models/technician");
const StoreRoom = require("../models/storeroom");
const middleware = require("../utils/middleware");
const moment = require("moment");

router.get("/registerLed", catchAsync(async (req, res, next) => {
	const storeroom = await StoreRoom.findOne({});

	res.render("ledlights/registerLed", { storeroom });
}));

router.post("/registerLed", catchAsync(async (req, res, next) => {
    try {
		const ledLighthouse = new LedLight({ ...req.body , accumulatorDateGroups : {}, solarGeneratorDateGroups : {}});
		for(var i = 0; i < req.body.accumulator.length; i++) {
			if(req.body.accumulatorDate[i] != undefined && req.body.accumulatorDate[i] != ""){
				ledLighthouse.accumulatorDateGroups.set(i.toString(), []);
				ledLighthouse.accumulatorDateGroups.get(i.toString()).push(req.body.accumulatorDate[i]);
			}
			if(req.body.solarGeneratorDate[i] != undefined && req.body.solarGeneratorDate[i] != ""){
				ledLighthouse.solarGeneratorDateGroups.set(i.toString(), []);
				ledLighthouse.solarGeneratorDateGroups.get(i.toString()).push(req.body.solarGeneratorDate[i]);
			}
		}
		moment.locale('el');
		ledLighthouse.dateModified = moment().format('LL');

        await ledLighthouse.save();
		req.flash("success", "Επιτυχής εγγραφή");
        res.redirect('/');
	}
	catch(e) {
		req.flash("error", e.message);
		res.redirect('/ledLighthouses/registerLed');
	}
}));

router.post("/search/:id", catchAsync(async (req, res) => {
	const searchedLed = await LedLight.find({_id: req.params.id}).populate("technicians");
	
	res.render("ledlights/searchLed", { searchedLed });
}));

router.get("/updateLed/:id", catchAsync(async (req, res) => {
    const ledLightHouse = await LedLight.findById(req.params.id);

	res.render("ledlights/updateLed", { ledLightHouse });
}));

router.get("/technicians/:id", catchAsync(async (req, res) => {
    const ledLightHouse = await LedLight.findById(req.params.id).populate("technicians").exec();
	
	res.render("ledlights/ledTechnicians", { ledLightHouse });
}));

router.get("/technicians/new/:id", catchAsync(async (req, res) => {
    const ledLightHouse = await LedLight.findById(req.params.id).populate("technicians").exec();

	res.render("ledlights/ledTechniciansNew", { ledLightHouse });
}));

router.post("/technicians/new/:id", catchAsync(async (req, res) => {
	try {
		const newTechnician = new Technician({...req.body.arr});
		const ledLightHouse = await LedLight.findById(req.params.id).populate("technicians").exec();
		await ledLightHouse.technicians.push(newTechnician);
		await ledLightHouse.save();
		await newTechnician.save();
		req.flash("success", "Επιτυχής εγγραφή");
		res.redirect(`/ledLighthouses/insertLed/${req.params.id}`);
	}
	catch(e) {
		req.flash("error", e.message);
		res.redirect(`/ledLighthouses/technicians/new/${req.params.id}`);	
	}
}));

router.get("/insertLed/:id", catchAsync(async (req, res) => {
    const ledLightHouse = await LedLight.findById(req.params.id);

	res.render("ledlights/insertLed", { ledLightHouse });
}));

router.put("/insertLed/:id", catchAsync(async (req, res) => {
	try {
		var id;
		const tmp = req.params.id.charAt(0);
		if(tmp === ":"){
			id = req.params.id.substring(1);
		}
		else{
			id = req.params.id;
		}
		const ledLightHouse = await LedLight.findById(id);

		ledLightHouse.accumulator.splice(0, ledLightHouse.accumulator.length, ...req.body.accumulator);
		if(req.body.accumulatorNew != undefined && req.body.accumulatorNew != null && req.body.accumulatorNew != ""){
			ledLightHouse.accumulator.push(req.body.accumulatorNew);
		}	
		if(req.body.accumulatorDateNew != undefined && req.body.accumulatorDateNew != null && req.body.accumulatorDateNew != ""){
			ledLightHouse.accumulatorDate.push(req.body.accumulatorDateNew);
		}
		for (var i = 0; i < req.body.accumulator.length; i++) {
			if(req.body.accumulatorDate[i] != undefined && req.body.accumulatorDate[i] != null && req.body.accumulatorDate[i] != ""){
				var flag = true;
				for(var temp = 0; temp < req.body.accumulatorDate.length; temp++) {
					if(!ledLightHouse.accumulatorDate.includes(req.body.accumulatorDate[temp])) {
						flag = false;
					}
				}
				if(!flag) {
					if(ledLightHouse.accumulatorDateGroups.get(i.toString()) === undefined) {
						ledLightHouse.accumulatorDateGroups.set(i.toString(), []);
					}
					ledLightHouse.accumulatorDateGroups.set(i.toString(), [req.body.accumulatorDate[i].toString(), ...ledLightHouse.accumulatorDateGroups.get(i.toString())]);
				}
			}
		}

		ledLightHouse.solarGenerator.splice(0, ledLightHouse.solarGenerator.length, ...req.body.solarGenerator);
		if(req.body.solarGeneratorNew != undefined && req.body.solarGeneratorNew != null && req.body.solarGeneratorNew != ""){
			ledLightHouse.solarGenerator.push(req.body.solarGeneratorNew);
		}	
		if(req.body.solarGeneratorDateNew != undefined && req.body.solarGeneratorDateNew != null && req.body.solarGeneratorDateNew != ""){
			ledLightHouse.solarGeneratorDate.push(req.body.solarGeneratorDateNew);
		}
		for (var i = 0; i < req.body.solarGenerator.length; i++) {
			if(req.body.solarGeneratorDate[i] != undefined && req.body.solarGeneratorDate[i] != null && req.body.solarGeneratorDate[i] != ""){
				var flag = true;
				for(var temp = 0; temp < req.body.solarGeneratorDate.length; temp++) {
					if(!ledLightHouse.solarGeneratorDate.includes(req.body.solarGeneratorDate[temp])) {
						flag = false;
					}
				}
				if(!flag) {
					if(ledLightHouse.solarGeneratorDateGroups.get(i.toString()) === undefined) {
						ledLightHouse.solarGeneratorDateGroups.set(i.toString(), []);
					}
					ledLightHouse.solarGeneratorDateGroups.set(i.toString(), [req.body.solarGeneratorDate[i].toString(), ...ledLightHouse.accumulatorDateGroups.get(i.toString())]);
				}
			}
		}
		
		if(req.body.aef != undefined && req.body.aef != null && req.body.aef != ""){
			ledLightHouse.aef = req.body.aef;
		}
		if(req.body.lighthouse != undefined && req.body.lighthouse != null && req.body.lighthouse != ""){
			ledLightHouse.lighthouse = req.body.lighthouse;
		}
		if(req.body.colour != undefined && req.body.colour != null && req.body.colour != ""){
			ledLightHouse.colour = req.body.colour;
		}
		if(req.body.sections != undefined && req.body.sections != null && req.body.sections != ""){
			ledLightHouse.sections = req.body.sections;
		}
		if(req.body.features != undefined && req.body.features != null && req.body.features != ""){
			ledLightHouse.features = req.body.features;
		}
		if(req.body.position != undefined && req.body.position != null && req.body.position != ""){
			ledLightHouse.position = req.body.position;
		}
		if(req.body.location != undefined && req.body.location != null && req.body.location != ""){
			ledLightHouse.location = req.body.location;
		}
		if(req.body.headDate != undefined && req.body.headDate != null && req.body.headDate != "" && !ledLightHouse.headDate.includes(req.body.headDate)){
			ledLightHouse.headDate.push(req.body.headDate);
		}
		if(req.body.chargeRegulatorDate != undefined && req.body.chargeRegulatorDate != null && req.body.chargeRegulatorDate != "" && !ledLightHouse.chargeRegulatorDate.includes(req.body.chargeRegulatorDate)){
			ledLightHouse.chargeRegulatorDate.push(req.body.solarGeneratorDate);
		}
		if(req.body.socketDate != undefined && req.body.socketDate != null && req.body.socketDate != "" && !ledLightHouse.socketDate.includes(req.body.socketDate)){
			ledLightHouse.socketDate.push(req.body.socketDate);
		}
		if(req.body.head != undefined && req.body.head != null && req.body.head != ""){
			ledLightHouse.head = req.body.head;
		}
		if(req.body.chargeRegulator != undefined && req.body.chargeRegulator != null && req.body.chargeRegulator != ""){
			ledLightHouse.chargeRegulator = req.body.chargeRegulator;
		}
		if(req.body.socket != undefined && req.body.socket != null && req.body.socket != ""){
			ledLightHouse.socket = req.body.socket;
		}
		moment.locale('el');
		ledLightHouse.dateModified = moment().format('LL');

		await ledLightHouse.save();
	}
	catch(e) {
		req.flash("error", e.message);
		res.redirect('/ledLighthouses/insertLed/:id');
	}
	
    req.flash("success", "Επιτυχής ενημέρωση!");
	res.redirect(`/ledLighthouses/technicians/${req.params.id}`);
}));

router.put("/deleteSuggest/:id", middleware.isLoggedIn, catchAsync(async (req, res, next) => {
    const ledSuggests = await LedLight.findById(req.params.id).populate({
		path: "technicians",
		match: { technician: { $eq: req.body.technician }, date: {$eq: req.body.date}, description: {$eq: req.body.description}, suggests: {$eq: req.body.suggests}},
	}).exec();
	ledSuggests.technicians[0].suggests = "";
	ledSuggests.technicians[0].save();
	await ledSuggests.save();
	req.flash("success", "Επιτυχής διαγραφή");
	res.redirect('/');
}));

router.get("/sum", catchAsync(async (req, res, next) => {
	const ledLightHouses = await LedLight.find({});
	var heads = new Array();
	var solarGenerators = new Array();
	var accumulators = new Array();
	var colours = new Array();

	for (const item of ledLightHouses) {
		if(item.head != "" && item.head != undefined) {
			heads = heads.concat(item.head.toUpperCase());
		}
		if(item.accumulator != "" && item.accumulator != undefined) {
			accumulators = accumulators.concat(item.accumulator);
		}
		if(item.colour != "" && item.colour != undefined) {
			colours = colours.concat(item.colour.toUpperCase());
		}
		if(item.solarGenerator != "" && item.solarGenerator != undefined) {
			solarGenerators = solarGenerators.concat(item.solarGenerator);
		}
	}
	
	var headsCount = {};
	heads.forEach(function(i) { headsCount[i] = (headsCount[i]||0) + 1;});
	var coloursCount = {};
	colours.forEach(function(i) { coloursCount[i] = (coloursCount[i]||0) + 1;});
	var solarGeneratorsCount = {};
	solarGenerators.forEach(function(i) { solarGeneratorsCount[i] = (solarGeneratorsCount[i]||0) + 1;});
	var accumulatorsCount = {};
	accumulators.forEach(function(i) { accumulatorsCount[i] = (accumulatorsCount[i]||0) + 1;});
    res.render("ledlights/ledSum", {headsCount, solarGeneratorsCount, accumulatorsCount, coloursCount});
}));

module.exports = router;
