const express = require("express");
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const LightBeacon = require("../models/lightbeacons");
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

router.get("/registerLight", catchAsync(async (req, res, next) => {
	const storeroom = await StoreRoom.findOne({});

	res.render("lightbeacons/registerLight", { storeroom });
}));

router.post("/registerLight", upload.single("file"), catchAsync(async (req, res, next) => {
    try {
		const lightBeacon = new LightBeacon({ ...req.body , accumulatorDateGroups : {} });

		for(var i = 0; i < req.body.accumulator.length; i++) {
			if(req.body.accumulatorDate[i] != undefined && req.body.accumulatorDate[i] != ""){
				lightBeacon.accumulatorDateGroups.set(i.toString(), []);
				lightBeacon.accumulatorDateGroups.get(i.toString()).push(req.body.accumulatorDate[i]);
			}
		}
		lightBeacon.stigma.x = req.body.stigmax;
		lightBeacon.stigma.y = req.body.stigmax;
		lightBeacon.lightingMachine.manufacturer = req.body.lightingMachineMan;
		lightBeacon.lightingMachine.type = req.body.lightingMachineType;
		lightBeacon.lightingMachine.counter = req.body.lightingMachineCounter;
		lightBeacon.reflector.manufacturer = req.body.reflectorMan;
		lightBeacon.reflector.type = req.body.reflectorType;
		lightBeacon.reflector.counter = req.body.reflectorCounter;
		lightBeacon.signs.manufacturer = req.body.signsMan;
		lightBeacon.signs.type = req.body.signsType;
		lightBeacon.signs.counter = req.body.signsCounter;
		lightBeacon.stateri.type = req.body.stateriType;
		lightBeacon.stateri.counter = req.body.stateriCounter*2;
		lightBeacon.alysos.type = req.body.alysosType;
		lightBeacon.alysos.counter = req.body.alysosCounter;
		lightBeacon.agkyrioChain.type = req.body.agkyrioChainType;
		lightBeacon.agkyrioChain.counter = req.body.agkyrioChainCounter*2;
		lightBeacon.streptyras.type = req.body.streptyrasType;
		lightBeacon.streptyras.counter = req.body.streptyrasCounter;
		lightBeacon.navyKey.type = req.body.navyKeyType;
		lightBeacon.navyKey.counter = req.body.navyKeyCounter;
		lightBeacon.agkyrio.type = req.body.agkyrioType;
		lightBeacon.agkyrio.counter = req.body.agkyrioCounter;

		if (req.file != undefined) {
			lightBeacon.file = req.file.filename;
		}
		moment.locale('el');
		lightBeacon.dateModified = moment().format('LL');

        await lightBeacon.save();
		req.flash("success", "Επιτυχής εγγραφή");
        res.redirect('/');
	}
	catch(e) {
		req.flash("error", e.message);
		res.redirect('/lightBeacons/registerLight');
	}
}));

router.post("/search/:id", catchAsync(async (req, res) => {
	const searchedLight = await LightBeacon.find({_id: req.params.id}).populate("technicians");
	var today = new Date();
	var days = Math.floor((Math.abs(searchedLight[0].immersionDepthDate-today))/(1000*60*60*24));
	
	res.render("lightbeacons/searchLight", { searchedLight, days});
}));

router.get("/technicians/:id", catchAsync(async (req, res) => {
    const lightBeacon = await LightBeacon.findById(req.params.id).populate("technicians").exec();
	
	res.render("lightbeacons/lightTechnicians", { lightBeacon });
}));

router.get("/technicians/new/:id", catchAsync(async (req, res) => {
    const lightBeacon = await LightBeacon.findById(req.params.id).populate("technicians").exec();
	const storeroom = await StoreRoom.findOne({});

	res.render("lightbeacons/lightTechniciansNew", { lightBeacon, storeroom });
}));

router.post("/technicians/new/:id", catchAsync(async (req, res) => {
	try {
		const newTechnician = new Technician({...req.body.arr});
		const lightBeacon = await LightBeacon.findById(req.params.id).populate("technicians").exec();
		await lightBeacon.technicians.push(newTechnician);
		await lightBeacon.save();
		await newTechnician.save();
		req.flash("success", "Επιτυχής εγγραφή");
		res.redirect(`/lightBeacons/insertLight/${req.params.id}`);
	}
	catch(e) {
		req.flash("error", e.message);
		res.redirect(`/lightBeacons/technicians/new/${req.params.id}`);		
	}
}));

router.get("/insertLight/:id", catchAsync(async (req, res) => {
    const lightBeacon = await LightBeacon.findById(req.params.id);
	const storeroom = await StoreRoom.findOne({});

	res.render("lightbeacons/insertLight", { lightBeacon , storeroom});
}));

router.put("/insertLight/:id", catchAsync(async (req, res) => {
	try {
		var id;
		const tmp = req.params.id.charAt(0);
		if(tmp === ":"){
			id = req.params.id.substring(1);
		}
		else{
			id = req.params.id;
		}
		const lightBeacon = await LightBeacon.findByIdAndUpdate(id, { ...req.body});
		
		lightBeacon.accumulator.splice(0, lightBeacon.accumulator.length, ...req.body.accumulator);
		if(req.body.accumulatorNew != undefined && req.body.accumulatorNew != null && req.body.accumulatorNew != ""){
			lightBeacon.accumulator.push(req.body.accumulatorNew);
		}
		var length = lightBeacon.accumulatorDateGroups.size;
		if(req.body.accumulatorDateNew != undefined && req.body.accumulatorDateNew != null && req.body.accumulatorDateNew != ""){
			lightBeacon.accumulatorDateGroups.set(length.toString(), []);
			lightBeacon.accumulatorDateGroups.get((length).toString()).push(req.body.accumulatorDateNew);
			lightBeacon.accumulatorDate.push(req.body.accumulatorDateNew);
		}
		for (var i = 0; i < req.body.accumulator.length; i++) {
			if(req.body.accumulatorDate[i] != undefined && req.body.accumulatorDate[i] != null && req.body.accumulatorDate[i] != ""){
				if(!lightBeacon.accumulatorDateGroups.get(i.toString()).includes(req.body.accumulatorDate[i])) {
					if(lightBeacon.accumulatorDateGroups.get(i.toString()) === undefined) {
						lightBeacon.accumulatorDateGroups.set(i.toString(), []);
					}
					lightBeacon.accumulatorDateGroups.set(i.toString(), [...lightBeacon.accumulatorDateGroups.get(i.toString()), req.body.accumulatorDate[i].toString()]);
				}
			}
		}

		lightBeacon.stigma.x = req.body.stigmax;
		lightBeacon.stigma.y = req.body.stigmax;
		lightBeacon.lightingMachine.manufacturer = req.body.lightingMachineMan;
		lightBeacon.lightingMachine.type = req.body.lightingMachineType;
		lightBeacon.lightingMachine.counter = req.body.lightingMachineCounter;
		lightBeacon.reflector.manufacturer = req.body.reflectorMan;
		lightBeacon.reflector.type = req.body.reflectorType;
		lightBeacon.reflector.counter = req.body.reflectorCounter;
		lightBeacon.signs.manufacturer = req.body.signsMan;
		lightBeacon.signs.type = req.body.signsType;
		lightBeacon.signs.counter = req.body.signsCounter;
		lightBeacon.stateri.type = req.body.stateriType;
		lightBeacon.stateri.counter = req.body.stateriCounter*2;
		lightBeacon.alysos.type = req.body.alysosType;
		lightBeacon.alysos.counter = req.body.alysosCounter;
		lightBeacon.agkyrioChain.type = req.body.agkyrioChainType;
		lightBeacon.agkyrioChain.counter = req.body.agkyrioChainCounter*2;
		lightBeacon.streptyras.type = req.body.streptyrasType;
		lightBeacon.streptyras.counter = req.body.streptyrasCounter;
		lightBeacon.navyKey.type = req.body.navyKeyType;
		lightBeacon.navyKey.counter = req.body.navyKeyCounter;
		lightBeacon.agkyrio.type = req.body.agkyrioType;
		lightBeacon.agkyrio.counter = req.body.agkyrioCounter;
		lightBeacon.lightingMachineDate.push(req.body.lightingMachineDat);
		

		moment.locale('el');
		lightBeacon.dateModified = moment().format('LL');
		
		await lightBeacon.save();
	}
	catch(e) {
		req.flash("error", e.message);
		res.redirect('/lightBeacons/insertLight/:id');
	}
	
    req.flash("success", "Επιτυχής ενημέρωση!");
	res.redirect(`/lightBeacons/technicians/${req.params.id}`);		
}));

router.put("/deleteSuggest/:id", middleware.isLoggedIn, catchAsync(async (req, res, next) => {
    const lightSuggests = await LightBeacon.findById(req.params.id).populate({
		path: "technicians",
		match: { technician: { $eq: req.body.technician }, date: {$eq: req.body.date}, description: {$eq: req.body.description}, suggests: {$eq: req.body.suggests}},
	}).exec();
	lightSuggests.technicians[0].suggests = "";
	lightSuggests.technicians[0].save();
	
	await lightSuggests.save();

	req.flash("success", "Επιτυχής διαγραφή");
	res.redirect('/');
}));

router.get("/sum", catchAsync(async (req, res, next) => {
	const lightBeacon = await LightBeacon.find({});
	var types = new Array();
	var colours = new Array();
	var lightingMachines = new Map();
	var reflectors = new Map();
	var accumulators = new Array();
	var signs = new Map();
	var usedChain = new Map();
	var tmp = "";

	for (const item of lightBeacon) {
		if(item.type != "" && item.type != undefined) {
			types = types.concat(item.type);
		}
		if(item.colour != "" && item.colour != undefined) {
			colours = colours.concat(item.colour.toUpperCase());
		}
		if(item.accumulator != "" && item.accumulator != undefined) {
			accumulators = accumulators.concat(item.accumulator);
		}
		for (const [key, value] of Object.entries(item.lightingMachine)) {
			if (value != "" && value != undefined && value !== null) {
				if (key === "type") {
					if (lightingMachines.get(value) === undefined) {
						lightingMachines.set(value, 0);
					}
					tmp = value;
				}
				else if (key === "counter")
					lightingMachines.set(tmp, lightingMachines.get(tmp) + value);
			}
		}

		tmp = "";
		for (const [key, value] of Object.entries(item.reflector)) {
			if (value != "" && value != undefined && value !== null) {
				if (key === "type") {
					if (reflectors.get(value) === undefined) {
						reflectors.set(value, 0);
					}
					tmp = value;
				}
				else if (key === "counter")
					reflectors.set(tmp, reflectors.get(tmp) + value);
			}
		}

		tmp = "";
		for (const [key, value] of Object.entries(item.signs)) {
			if (value != "" && value != undefined && value !== null) {
				if (key === "type") {
					if (signs.get(value) === undefined) {
						signs.set(value, 0);
					}
					tmp = value;
				}
				else if (key === "counter")
					signs.set(tmp, signs.get(tmp) + value);
			}
		}

		if (usedChain.get(item.alysos.type) === undefined) {
			if(item.usedChain !== null)
				usedChain.set(item.alysos.type, item.usedChain);
		}
		else {
			if(item.usedChain !== null)
				usedChain.set(item.alysos.type, usedChain.get(item.alysos.type) + item.usedChain);
		}
	}

	var coloursCount = {};
	colours.forEach(function(i) { coloursCount[i] = (coloursCount[i]||0) + 1;});
	var typesCount = {};
	types.forEach(function(i) { typesCount[i] = (typesCount[i]||0) + 1;});
	var accumulatorsCount = {};
	accumulators.forEach(function(i) { accumulatorsCount[i] = (accumulatorsCount[i]||0) + 1;});

    res.render("lightbeacons/lightSum", {typesCount, coloursCount, accumulatorsCount, lightingMachines, reflectors, signs, usedChain});
}));

module.exports = router;
