const express = require("express");
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const AutoLight = require("../models/autolighthouses");
const Technician = require("../models/technician");
const middleware = require("../utils/middleware");
const moment = require("moment");

router.get("/registerAuto", (req, res) => {
	res.render("autolights/registerAuto");
});

router.post("/registerAuto", catchAsync(async (req, res, next) => {
    try {
		const autoLighthouse = new AutoLight({ ...req.body , accumulatorDateGroups : {}, lampDateGroups : {}, solarGeneratorDateGroups : {}});
		for(var i = 0; i < req.body.accumulator.length; i++) {
			if(req.body.accumulatorDate[i] != undefined && req.body.accumulatorDate[i] != ""){
				autoLighthouse.accumulatorDateGroups.set(i.toString(), []);
				autoLighthouse.accumulatorDateGroups.get(i.toString()).push(req.body.accumulatorDate[i]);
			}
		}
		for(var i = 0; i < req.body.lamp.length; i++) {
			if(req.body.lampDate[i] != undefined && req.body.lampDate[i] != "") {
				autoLighthouse.lampDateGroups.set(i.toString(), []);
				autoLighthouse.lampDateGroups.get(i.toString()).push(req.body.lampDate[i]);
			}
		}
		for(var i = 0; i < req.body.solarGenerator.length; i++) {
			if(req.body.solarGeneratorDate[i] != undefined && req.body.solarGeneratorDate[i] != "") {
				autoLighthouse.solarGeneratorDateGroups.set(i.toString(), []);
				autoLighthouse.solarGeneratorDateGroups.get(i.toString()).push(req.body.solarGeneratorDate[i]);
			}
		}

		moment.locale('el');
		autoLighthouse.dateModified = moment().format('LL');

        await autoLighthouse.save();
		req.flash("success", "Επιτυχής εγγραφή");
        res.redirect('/');
	}
	catch(e) {
		req.flash("error", e.message);
		res.redirect('/autoLighthouses/registerAuto');
	}
}));

router.post("/search/:id", catchAsync(async (req, res) => {
	const searchedAuto = await AutoLight.find({_id: req.params.id}).populate("technicians");
	
	res.render("autolights/searchAuto", { searchedAuto});
}));

router.get("/technicians/:id", catchAsync(async (req, res) => {
    const autoLightHouse = await AutoLight.findById(req.params.id).populate("technicians").exec();
	
	res.render("autolights/autoTechnicians", { autoLightHouse });
}));

router.get("/technicians/new/:id", catchAsync(async (req, res) => {
    const autoLightHouse = await AutoLight.findById(req.params.id).populate("technicians").exec();

	res.render("autolights/autoTechniciansNew", { autoLightHouse });
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

	res.render("autolights/insertAuto", { autoLightHouse });
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

		autoLightHouse.accumulator.splice(0, autoLightHouse.accumulator.length, ...req.body.accumulator);
		if(req.body.accumulatorNew != undefined && req.body.accumulatorNew != null && req.body.accumulatorNew != ""){
			autoLightHouse.accumulator.push(req.body.accumulatorNew);
		}
		if(req.body.accumulatorDateNew != undefined && req.body.accumulatorDateNew != null && req.body.accumulatorDateNew != ""){
			autoLightHouse.accumulatorDate.push(req.body.accumulatorDateNew);
		}
		for (var i = 0; i < req.body.accumulator.length; i++) {
			if(req.body.accumulatorDate[i] != undefined && req.body.accumulatorDate[i] != null && req.body.accumulatorDate[i] != ""){
				var flag = true;
				for(var temp = 0; temp < req.body.accumulatorDate.length; temp++) {
					if(!autoLightHouse.accumulatorDate.includes(req.body.accumulatorDate[temp])) {
						flag = false;
					}
				}
				if(!flag) {
					if(autoLightHouse.accumulatorDateGroups.get(i.toString()) === undefined) {
						autoLightHouse.accumulatorDateGroups.set(i.toString(), []);
					}
					autoLightHouse.accumulatorDateGroups.set(i.toString(), [req.body.accumulatorDate[i].toString(), ...autoLightHouse.accumulatorDateGroups.get(i.toString())]);
				}
			}
		}
		
		autoLightHouse.lamp.splice(0, autoLightHouse.lamp.length, ...req.body.lamp);
		if(req.body.lampNew != undefined && req.body.lampNew != null && req.body.lampNew != ""){
			autoLightHouse.lamp.push(req.body.lampNew);
		}
		if(req.body.lampDateNew != undefined && req.body.lampDateNew != null && req.body.lampDateNew != ""){
			autoLightHouse.lampDate.push(req.body.lampDateNew);
		}
		for (var i = 0; i < req.body.lamp.length; i++) {
			if(req.body.lampDate[i] != undefined && req.body.lampDate[i] != null && req.body.lampDate[i] != "" && !autoLightHouse.lampDate.includes(req.body.lampDate)){
				var flag = true;
				for(var temp = 0; temp < req.body.lampDate.length; temp++) {
					if(!autoLightHouse.lampDate.includes(req.body.lampDate[temp])) {
						flag = false;
					}
				}
				if(!flag) {
					if(autoLightHouse.lampDateGroups.get(i.toString()) === undefined) {
						autoLightHouse.lampDateGroups.set(i.toString(), []);
					}
					autoLightHouse.lampDateGroups.set(i.toString(), [req.body.lampDate[i].toString(), ...autoLightHouse.lampDateGroups.get(i.toString())]);
				}
			}
		}

		autoLightHouse.solarGenerator.splice(0, autoLightHouse.solarGenerator.length, ...req.body.solarGenerator);
		if(req.body.solarGeneratorNew != undefined && req.body.solarGeneratorNew != null && req.body.solarGeneratorNew != ""){
			autoLightHouse.solarGenerator.push(req.body.solarGeneratorNew);
		}
		if(req.body.solarGeneratorDateNew != undefined && req.body.solarGeneratorDateNew != null && req.body.solarGeneratorDateNew != ""){
			autoLightHouse.solarGeneratorDate.push(req.body.solarGeneratorDateNew);
		}
		for (var i = 0; i < req.body.solarGenerator.length; i++) {
			if(req.body.solarGeneratorDate[i] != undefined && req.body.solarGeneratorDate[i] != null && req.body.solarGeneratorDate[i] != "" && !autoLightHouse.solarGeneratorDate.includes(req.body.solarGeneratorDate)){
				var flag = true;
				for(var temp = 0; temp < req.body.solarGeneratorDate.length; temp++) {
					if(!autoLightHouse.solarGeneratorDate.includes(req.body.solarGeneratorDate[temp])) {
						flag = false;
					}
				}
				if(!flag) {
					if(autoLightHouse.solarGeneratorDateGroups.get(i.toString()) === undefined) {
						autoLightHouse.solarGeneratorDateGroups.set(i.toString(), []);
					}
					autoLightHouse.solarGeneratorDateGroups.set(i.toString(), [req.body.solarGeneratorDate[i].toString(), ...autoLightHouse.solarGeneratorDateGroups.get(i.toString())]);
				}
			}
		}
		if(req.body.aef != undefined && req.body.aef != null && req.body.aef != ""){
			autoLightHouse.aef = req.body.aef;
		}
		if(req.body.lighthouse != undefined && req.body.lighthouse != null && req.body.lighthouse != ""){
			autoLightHouse.lighthouse = req.body.lighthouse;
		}
		if(req.body.colour != undefined && req.body.colour != null && req.body.colour != ""){
			autoLightHouse.colour = req.body.colour;
		}
		if(req.body.sections != undefined && req.body.sections != null && req.body.sections != ""){
			autoLightHouse.sections = req.body.sections;
		}
		if(req.body.features != undefined && req.body.features != null && req.body.features != ""){
			autoLightHouse.features = req.body.features;
		}
		if(req.body.position != undefined && req.body.position != null && req.body.position != ""){
			autoLightHouse.position = req.body.position;
		}
		if(req.body.location != undefined && req.body.location != null && req.body.location != ""){
			autoLightHouse.location = req.body.location;
		}
		if(req.body.lighterDate != undefined && req.body.lighterDate != null && req.body.lighterDate != "" && !autoLightHouse.lighterDate.includes(req.body.lighterDate)){
			autoLightHouse.lighterDate.push(req.body.lighterDate);
		}
		if(req.body.headDate != undefined && req.body.headDate != null && req.body.headDate != "" && !autoLightHouse.headDate.includes(req.body.headDate)){
			autoLightHouse.headDate.push(req.body.headDate);
		}
		if(req.body.generatorSocketDate != undefined && req.body.generatorSocketDate != null && req.body.generatorSocketDate != "" && !autoLightHouse.generatorSocketDate.includes(req.body.generatorSocketDate)){
			autoLightHouse.generatorSocketDate.push(req.body.generatorSocketDate);
		}
		if(req.body.torchSocketDate != undefined && req.body.torchSocketDate != null && req.body.torchSocketDate != "" && !autoLightHouse.torchSocketDate.includes(req.body.torchSocketDate)){
			autoLightHouse.torchSocketDate.push(req.body.torchSocketDate);
		}
		if(req.body.photocellDate != undefined && req.body.photocellDate != null && req.body.photocellDate != "" && !autoLightHouse.photocellDate.includes(req.body.photocellDate)){
			autoLightHouse.photocellDate.push(req.body.photocellDate);
		}
		if(req.body.accessory != undefined && req.body.accessory != null && req.body.accessory != ""){
			autoLightHouse.accessory.push(req.body.accessory);
		}
		if(req.body.accessoryDate != undefined && req.body.accessoryDate != null && req.body.accessoryDate != "" && !autoLightHouse.accessoryDate.includes(req.body.accessoryDate)){
			autoLightHouse.accessoryDate.push(req.body.accessoryDate);
		}
		if(req.body.alternator != undefined && req.body.alternator != null && req.body.alternator != ""){
			autoLightHouse.alternator = req.body.alternator;
		}
		if(req.body.alternatorDate != undefined && req.body.alternatorDate != null && req.body.alternatorDate != "" && !autoLightHouse.alternatorDate.includes(req.body.alternatorDate)){
			autoLightHouse.alternatorDate.push(req.body.alternatorDate);
		}
		if(req.body.lighter != undefined && req.body.lighter != null && req.body.lighter != ""){
			autoLightHouse.lighter = req.body.lighter;
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
		
		moment.locale('el');
		autoLightHouse.dateModified = moment().format('LL');
		
		await autoLightHouse.save();
	}
	catch(e) {
		req.flash("error", e.message);
		res.redirect('/autoLighthouses/insertAuto/:id');
	}
	
    req.flash("success", "Επιτυχής ενημέρωση!");
	res.redirect(`/autoLighthouses/technicians/${req.params.id}`);		
}));

router.put("/deleteSuggest/:id", middleware.isLoggedIn, catchAsync(async (req, res, next) => {
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
	var heads = new Array();
	var lamps = new Array();
	var solarGenerators = new Array();
	var accumulators = new Array();
	var generatorSockets = new Array();
	var sockets = new Array();
	var colours = new Array();

	for (const item of autoLightHouses) {
		if(item.head != "" && item.head != undefined) {
			heads = heads.concat(item.head.toUpperCase());
		}
		if(item.lamp != "" && item.lamp != undefined) {
			lamps = lamps.concat(item.lamp);
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
	var headsCount = {};
	heads.forEach(function(i) { headsCount[i] = (headsCount[i]||0) + 1;});
	var solarGeneratorsCount = {};
	solarGenerators.forEach(function(i) { solarGeneratorsCount[i] = (solarGeneratorsCount[i]||0) + 1;});
	var accumulatorsCount = {};
	accumulators.forEach(function(i) { accumulatorsCount[i] = (accumulatorsCount[i]||0) + 1;});
	var generatorSocketsCount = {};
	generatorSockets.forEach(function(i) { generatorSocketsCount[i] = (generatorSocketsCount[i]||0) + 1;});
	var socketsCount = {};
	sockets.forEach(function(i) { socketsCount[i] = (socketsCount[i]||0) + 1;});

    res.render("autolights/autoSum", {lampsCount, headsCount, solarGeneratorsCount, accumulatorsCount, generatorSocketsCount, socketsCount, coloursCount});
}));

module.exports = router;
