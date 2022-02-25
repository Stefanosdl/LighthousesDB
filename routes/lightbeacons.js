const express = require("express");
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const LightBeacon = require("../models/lightbeacons");
const Technician = require("../models/technician");
const middleware = require("../utils/middleware");
const moment = require("moment");

router.get("/registerLight", (req, res) => {
	res.render("registerLight");
});

router.post("/registerLight", catchAsync(async (req, res, next) => {
    try {
		const lightBeacon = new LightBeacon({ ...req.body });
		
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
		lightBeacon.stateri.counter = req.body.stateriCounter;
		lightBeacon.alysos.type = req.body.alysosType;
		lightBeacon.alysos.counter = req.body.alysosCounter;
		lightBeacon.agkyrioChain.type = req.body.agkyrioChainType;
		lightBeacon.agkyrioChain.counter = req.body.agkyrioChainCounter;
		lightBeacon.streptyras.type = req.body.streptyrasType;
		lightBeacon.streptyras.counter = req.body.streptyrasCounter;
		lightBeacon.navyKey.type = req.body.navyKeyType;
		lightBeacon.navyKey.counter = req.body.navyKeyCounter;
		lightBeacon.navyKeyV.type = req.body.navyKeyVType;
		lightBeacon.navyKeyV.counter = req.body.navyKeyVCounter;
		lightBeacon.agkyrio.type = req.body.agkyrioType;
		lightBeacon.agkyrio.counter = req.body.agkyrioCounter;

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
	
	res.render("searchLight", { searchedLight});
}));

router.get("/technicians/:id", catchAsync(async (req, res) => {
    const lightBeacon = await LightBeacon.findById(req.params.id).populate("technicians").exec();
	
	res.render("lightTechnicians", { lightBeacon });
}));

router.get("/technicians/new/:id", catchAsync(async (req, res) => {
    const lightBeacon = await LightBeacon.findById(req.params.id).populate("technicians").exec();

	res.render("lightTechniciansNew", { lightBeacon });
}));

router.post("/technicians/new/:id", catchAsync(async (req, res) => {
	try {
		const newTechnician = new Technician({...req.body.arr});
		const lightBeacon = await LightBeacon.findById(req.params.id).populate("technicians").exec();
		await lightBeacon.technicians.push(newTechnician);
		await lightBeacon.save();
		await newTechnician.save();
		res.redirect(`/lightBeacons/insertLight/${req.params.id}`);
	}
	catch(e) {
		req.flash("error", e.message);
		res.redirect(`/lightBeacons/technicians/new/${req.params.id}`);		
	}
}));

router.get("/insertLight/:id", catchAsync(async (req, res) => {
    const lightBeacon = await LightBeacon.findById(req.params.id);

	res.render("insertLight", { lightBeacon });
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
		lightBeacon.stateri.counter = req.body.stateriCounter;
		lightBeacon.alysos.type = req.body.alysosType;
		lightBeacon.alysos.counter = req.body.alysosCounter;
		lightBeacon.agkyrioChain.type = req.body.agkyrioChainType;
		lightBeacon.agkyrioChain.counter = req.body.agkyrioChainCounter;
		lightBeacon.streptyras.type = req.body.streptyrasType;
		lightBeacon.streptyras.counter = req.body.streptyrasCounter;
		lightBeacon.navyKey.type = req.body.navyKeyType;
		lightBeacon.navyKey.counter = req.body.navyKeyCounter;
		lightBeacon.navyKeyV.type = req.body.navyKeyVType;
		lightBeacon.navyKeyV.counter = req.body.navyKeyVCounter;
		lightBeacon.agkyrio.type = req.body.agkyrioType;
		lightBeacon.agkyrio.counter = req.body.agkyrioCounter;

		moment.locale('el');
		lightBeacon.dateModified = moment().format('LL');
		
		await lightBeacon.save();
	}
	catch(e) {
		req.flash("error", e.message);
		res.redirect('/lightBeacons/insertConstant/:id');
	}
	
    req.flash("success", "Επιτυχής ενημέρωση!");
	res.redirect(`/lightBeacons/technicians/${req.params.id}`);		
}));

module.exports = router;
