const express = require("express");
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const LedLight = require("../models/ledlighthouses");
const Technician = require("../models/technician");
const middleware = require("../utils/middleware");

router.get("/registerLed", (req, res) => {
	res.render("registerLed");
});

router.post("/registerLed", catchAsync(async (req, res, next) => {
    try {
		const ledLighthouse = new LedLight({ ...req.body , accumulatorDateGroups : {}});
		for(var i = 0; i < req.body.accumulator.length; i++) {
			if(req.body.accumulatorDate[i] != undefined && req.body.accumulatorDate[i] != ""){
				ledLighthouse.accumulatorDateGroups.set(i.toString(), []);
				ledLighthouse.accumulatorDateGroups.get(i.toString()).push(req.body.accumulatorDate[i]);
			}
		}
        await ledLighthouse.save();
		req.flash("success", "Επιτυχής εγγραφή");
        res.redirect('/');
	}
	catch(e) {
		req.flash("error", e.message);
		res.redirect('/ledLighthouses/registerLed');
	}
}));

router.get("/updateLed/:id", catchAsync(async (req, res) => {
    const ledLightHouse = await LedLight.findById(req.params.id);

	res.render("updateLed", { ledLightHouse });
}));

router.get("/technicians/:id", catchAsync(async (req, res) => {
    const ledLightHouse = await LedLight.findById(req.params.id).populate("technicians").exec();
	
	res.render("ledTechnicians", { ledLightHouse });
}));

router.get("/technicians/new/:id", catchAsync(async (req, res) => {
    const ledLightHouse = await LedLight.findById(req.params.id).populate("technicians").exec();

	res.render("ledTechniciansNew", { ledLightHouse });
}));

router.post("/technicians/new/:id", catchAsync(async (req, res) => {
	try {
		const newTechnician = new Technician({...req.body.arr});
		const ledLightHouse = await LedLight.findById(req.params.id).populate("technicians").exec();
		await ledLightHouse.technicians.push(newTechnician);
		await ledLightHouse.save();
		await newTechnician.save();
		res.redirect(`/ledLighthouses/insertLed/${req.params.id}`);
	}
	catch(e) {
		req.flash("error", e.message);
		res.redirect(`/ledLighthouses/technicians/new/${req.params.id}`);	
	}
}));

router.get("/insertLed/:id", catchAsync(async (req, res) => {
    const ledLightHouse = await LedLight.findById(req.params.id);
	res.render("insertLed", { ledLightHouse });
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
				for(var temp = 0; i < req.body.accumulatorDate.length; i++) {
					if(!ledLightHouse.accumulatorDate.includes(req.body.accumulatorDate[i])) {
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
		if(req.body.solarGeneratorDate != undefined && req.body.solarGeneratorDate != null && req.body.solarGeneratorDate != "" && !ledLightHouse.solarGeneratorDate.includes(req.body.solarGeneratorDate)){
			ledLightHouse.solarGeneratorDate.push(req.body.solarGeneratorDate);
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
		if(req.body.solarGenerator != undefined && req.body.solarGenerator != null && req.body.solarGenerator != ""){
			ledLightHouse.solarGenerator = req.body.solarGenerator;
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
	res.redirect('/');
}));

router.get("/sum", catchAsync(async (req, res, next) => {
	const ledLightHouses = await LedLight.find({});
	var heads = new Array();
	var solarGenerators = new Array();
	var accumulators = new Array();
	var colours = new Array();

	for (const item of ledLightHouses) {
		if(item.head != "") {
			heads = heads.concat(item.head.toUpperCase());
		}
		if(item.accumulator != "") {
			accumulators = accumulators.concat(item.accumulator);
		}
		if(item.colour != "") {
			colours = colours.concat(item.colour.toUpperCase());
		}
		if(item.solarGenerator != "") {
			solarGenerators = solarGenerators.concat(item.solarGenerator.toUpperCase());
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
    res.render("ledSum", {headsCount, solarGeneratorsCount, accumulatorsCount, coloursCount});
}));

module.exports = router;
