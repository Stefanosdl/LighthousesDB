const express = require("express");
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const AutoLight = require("../models/autolighthouses");
const Technician = require("../models/technician");

router.get("/registerAuto", (req, res) => {
	res.render("registerAuto");
});

router.post("/registerAuto", catchAsync(async (req, res, next) => {
    try {
		const autoLighthouse = new AutoLight({aef: req.body.aef, lighthouse: req.body.lighthouse, features: req.body.features, location: req.body.location, lighter: req.body.lighter, solarGenerator: req.body.solarGenerator, head: req.body.head, lamp: req.body.lamp, generatorSocket: req.body.generatorSocket, torchSocket: req.body.torchSocket, photocell: req.body.photocell});
		autoLighthouse.lighterDate.push(req.body.lighterDate);
		autoLighthouse.solarGeneratorDate.push(req.body.solarGeneratorDate);
		autoLighthouse.accumulator.push(req.body.accumulator);
		autoLighthouse.headDate.push(req.body.headDate);
		autoLighthouse.lampDate.push(req.body.lampDate);
		autoLighthouse.generatorSocketDate.push(req.body.generatorSocketDate);
		autoLighthouse.accumulatorDate.push(req.body.accumulatorDate);
		autoLighthouse.photocellDate.push(req.body.photocellDate);
		autoLighthouse.accessory.push(req.body.accessory);
		autoLighthouse.accessoryDate.push(req.body.accessoryDate);
		autoLighthouse.torchSocketDate.push(req.body.torchSocketDate);
		
        await autoLighthouse.save();
		req.flash("success", "Επιτυχής εγγραφή");
        res.redirect('/');
	}
	catch(e) {
		req.flash("error", e.message);
		res.redirect('/autoLighthouses/registerAuto');
	}
}));

router.get("/technicians/:id", catchAsync(async (req, res) => {
    const autoLightHouse = await AutoLight.findById(req.params.id).populate("technicians").exec();
	
	res.render("autoTechnicians", { autoLightHouse });
}));

router.get("/technicians/new/:id", catchAsync(async (req, res) => {
    const autoLightHouse = await AutoLight.findById(req.params.id).populate("technicians").exec();

	res.render("autoTechniciansNew", { autoLightHouse });
}));

router.post("/technicians/new/:id", catchAsync(async (req, res) => {
	try {
		const newTechnician = new Technician({...req.body.arr});
		const autoLightHouse = await AutoLight.findById(req.params.id).populate("technicians").exec();
		await autoLightHouse.technicians.push(newTechnician);
		await autoLightHouse.save();
		await newTechnician.save();
		res.redirect(`/autoLighthouses/technicians/${req.params.id}`);
	}
	catch(e) {
		req.flash("error", e.message);
		res.redirect(`/autoLighthouses/technicians/new/${req.params.id}`);		
	}
}));

router.get("/insertAuto/:id", catchAsync(async (req, res) => {
    const autoLightHouse = await AutoLight.findById(req.params.id);

	res.render("insertAuto", { autoLightHouse });
}));

router.put("/insertAuto/:id", catchAsync(async (req, res) => {
	try {
		var id;
		const tmp = req.params.id.charAt(0);
		if(tmp === ":"){
			id = req.params.id.substring(1);
		}
		else{
			id = req.params.id;
		}
		const autoLightHouse = await AutoLight.findById(id);

		if(req.body.lighterDate != undefined && req.body.lighterDate != null && req.body.lighterDate != ""){
			autoLightHouse.lighterDate.push(req.body.lighterDate);
		}
		if(req.body.solarGeneratorDate != undefined && req.body.solarGeneratorDate != null && req.body.solarGeneratorDate != ""){
			autoLightHouse.solarGeneratorDate.push(req.body.solarGeneratorDate);
		}
		if(req.body.lampDate != undefined && req.body.lampDate != null && req.body.lampDate != ""){
			autoLightHouse.lampDate.push(req.body.lampDate);
		}
		if(req.body.accumulator != undefined && req.body.accumulator != null && req.body.accumulator != ""){
			autoLightHouse.accumulator.push(req.body.accumulator);
		}
		if(req.body.headDate != undefined && req.body.headDate != null && req.body.headDate != ""){
			autoLightHouse.headDate.push(req.body.headDate);
		}
		if(req.body.accumulatorDate != undefined && req.body.accumulatorDate != null && req.body.accumulatorDate != ""){
			autoLightHouse.accumulatorDate.push(req.body.accumulatorDate);
		}
		if(req.body.generatorSocketDate != undefined && req.body.generatorSocketDate != null && req.body.generatorSocketDate != ""){
			autoLightHouse.generatorSocketDate.push(req.body.generatorSocketDate);
		}
		if(req.body.torchSocketDate != undefined && req.body.torchSocketDate != null && req.body.torchSocketDate != ""){
			autoLightHouse.torchSocketDate.push(req.body.torchSocketDate);
		}
		if(req.body.photocellDate != undefined && req.body.photocellDate != null && req.body.photocellDate != ""){
			autoLightHouse.photocellDate.push(req.body.photocellDate);
		}
		if(req.body.accessory != undefined && req.body.accessory != null && req.body.accessory != ""){
			autoLightHouse.accessory.push(req.body.accessory);
		}
		if(req.body.accessoryDate != undefined && req.body.accessoryDate != null && req.body.accessoryDate != ""){
			autoLightHouse.accessoryDate.push(req.body.accessoryDate);
		}
		if(req.body.lighter != undefined && req.body.lighter != null && req.body.lighter != ""){
			autoLightHouse.lighter = req.body.lighter;
		}
		if(req.body.solarGenerator != undefined && req.body.solarGenerator != null && req.body.solarGenerator != ""){
			autoLightHouse.solarGenerator = req.body.solarGenerator;
		}
		if(req.body.lamp != undefined && req.body.lamp != null && req.body.lamp != ""){
			autoLightHouse.lamp = req.body.lamp;
		}
		if(req.body.head != undefined && req.body.head != null && req.body.head != ""){
			autoLightHouse.head = req.body.head;
		}
		if(req.body.generatorSocket != undefined && req.body.generatorSocket != null && req.body.generatorSocket != ""){
			autoLightHouse.generatorSocket = req.body.generatorSocket;
		}
		if(req.body.torchSocket != undefined && req.body.torchSocket != null && req.body.torchSocket != ""){
			autoLightHouse.torchSocket = req.body.torchSocket;
		}
		if(req.body.photocell != undefined && req.body.photocell != null && req.body.photocell != ""){
			autoLightHouse.photocell = req.body.photocell;
		}
		await autoLightHouse.save();
	}
	catch(e) {
		req.flash("error", e.message);
		res.redirect('/autoLighthouses/insertAuto/:id');
	}
	
    req.flash("success", "Επιτυχής ενημέρωση!");
    res.redirect('/');
}));

router.put("/deleteSuggest/:id", catchAsync(async (req, res, next) => {
    const autoSuggests = await AutoLight.findById(req.params.id).populate({
		path: "technicians",
		match: { technician: { $eq: req.body.technician }, date: {$eq: req.body.date}, description: {$eq: req.body.description}, suggests: {$eq: req.body.suggests}},
	}).exec();
	autoSuggests.technicians[0].suggests = "";
	autoSuggests.technicians[0].save();
	await autoSuggests.save();
	res.redirect('/');
}));

router.get("/sum", catchAsync(async (req, res, next) => {
	const solarString = "12V";
	const socketString = "220V";
	const autoLightHouses = await AutoLight.find({});
	var lamps = new Array();
	var solarGenerators = new Array();
	var accumulators = new Array();
	var generatorSockets = new Array();
	var sockets = new Array();
	for (const item of autoLightHouses) {
		lamps = lamps.concat(item.head);
		solarGenerators = solarGenerators.concat(item.solarGenerator);
		accumulators = accumulators.concat(item.accumulator);
		if (item.generatorSocket.includes(solarString)) {
			generatorSockets = generatorSockets.concat(item.generatorSocket);
		}
		else if (item.generatorSocket.includes(socketString)) {
			sockets = sockets.concat(item.generatorSocket);
		}
	}

	var lampsCount = {};
	lamps.forEach(function(i) { lampsCount[i] = (lampsCount[i]||0) + 1;});
	var solarGeneratorsCount = {};
	solarGenerators.forEach(function(i) { solarGeneratorsCount[i] = (solarGeneratorsCount[i]||0) + 1;});
	var accumulatorsCount = {};
	accumulators.forEach(function(i) { accumulatorsCount[i] = (accumulatorsCount[i]||0) + 1;});
	var generatorSocketsCount = {};
	generatorSockets.forEach(function(i) { generatorSocketsCount[i] = (generatorSocketsCount[i]||0) + 1;});
	var socketsCount = {};
	sockets.forEach(function(i) { socketsCount[i] = (socketsCount[i]||0) + 1;});

    res.render("autoSum", {lampsCount, solarGeneratorsCount, accumulatorsCount, generatorSocketsCount, socketsCount});
}));

module.exports = router;