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
		const autoLighthouse = new AutoLight({ ...req.body , accumulatorDateGroups : {}});
		for(var i = 0; i < req.body.accumulator.length; i++) {
			if(req.body.accumulatorDate[i] != undefined){
				autoLighthouse.accumulatorDateGroups.set(i.toString(), []);
				autoLighthouse.accumulatorDateGroups.get(i.toString()).push(req.body.accumulatorDate[i]);
			}
		}
		
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
		res.redirect(`/autoLighthouses/insertAuto/${req.params.id}`);
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

		var accum = new Array();
		for (const item of req.body.accumulator) {
			if(item != '' && item != undefined && item != null)
				accum.push(item);
		}

		if(accum.length != 0)
		autoLightHouse.accumulator.splice(0, autoLightHouse.accumulator.length, ...accum);
		if(req.body.accumulatorNew != undefined && req.body.accumulatorNew != null && req.body.accumulatorNew != ""){
			autoLightHouse.accumulator.push(req.body.accumulatorNew);
		}
		if(req.body.accumulatorDateNew != undefined && req.body.accumulatorDateNew != null && req.body.accumulatorDateNew != ""){
			autoLightHouse.accumulatorDate.push(req.body.accumulatorDateNew);
		}
		for (var i = 0; i < req.body.accumulator.length; i++) {
			if(req.body.accumulatorDate[i] != undefined && req.body.accumulatorDate[i] != null && req.body.accumulatorDate[i] != ""){
				if(autoLightHouse.accumulatorDateGroups.get(i.toString()) === undefined) {
					autoLightHouse.accumulatorDateGroups.set(i.toString(), []);
				}
				autoLightHouse.accumulatorDateGroups.set(i.toString(), [req.body.accumulatorDate[i].toString(), ...autoLightHouse.accumulatorDateGroups.get(i.toString())]);
			}
		}
		if(req.body.lighterDate != undefined && req.body.lighterDate != null && req.body.lighterDate != ""){
			autoLightHouse.lighterDate.push(req.body.lighterDate);
		}
		if(req.body.solarGeneratorDate != undefined && req.body.solarGeneratorDate != null && req.body.solarGeneratorDate != ""){
			autoLightHouse.solarGeneratorDate.push(req.body.solarGeneratorDate);
		}
		if(req.body.lampDate != undefined && req.body.lampDate != null && req.body.lampDate != ""){
			autoLightHouse.lampDate.push(req.body.lampDate);
		}
		if(req.body.headDate != undefined && req.body.headDate != null && req.body.headDate != ""){
			autoLightHouse.headDate.push(req.body.headDate);
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
		if(req.body.alternator != undefined && req.body.alternator != null && req.body.alternator != ""){
			autoLightHouse.alternator = req.body.alternator;
		}
		if(req.body.alternatorDate != undefined && req.body.alternatorDate != null && req.body.alternatorDate != ""){
			autoLightHouse.alternatorDate.push(req.body.alternatorDate);
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
	res.redirect(`/autoLighthouses/technicians/${req.params.id}`);		
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
	var colours = new Array();
	for (const item of autoLightHouses) {
		lamps = item.lamp.map(str => str.toUpperCase());
		lamps = lamps.concat(item.head.toUpperCase());
		colours = colours.concat(item.colour.toUpperCase());
		solarGenerators = solarGenerators.concat(item.solarGenerator.toUpperCase());
		accumulators = item.accumulator.map(str => str.toUpperCase());
		accumulators = accumulators.concat(item.accumulator);
		if (item.generatorSocket.includes(solarString)) {
			generatorSockets = generatorSockets.concat(item.generatorSocket.toUpperCase());
		}
		else if (item.generatorSocket.includes(socketString)) {
			sockets = sockets.concat(item.generatorSocket.toUpperCase());
		}
	}
	
	var coloursCount = {};
	colours.forEach(function(i) { coloursCount[i] = (coloursCount[i]||0) + 1;});
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

    res.render("autoSum", {lampsCount, solarGeneratorsCount, accumulatorsCount, generatorSocketsCount, socketsCount, coloursCount});
}));

module.exports = router;
