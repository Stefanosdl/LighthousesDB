const express = require("express");
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const LedLight = require("../models/ledlighthouses");
const Technician = require("../models/technician");

router.get("/registerLed", (req, res) => {
	res.render("registerLed");
});

router.post("/registerLed", catchAsync(async (req, res, next) => {
    try {
		const ledLighthouse = new LedLight({aef: req.body.aef, lighthouse: req.body.lighthouse, features: req.body.features, location: req.body.location, solarGenerator: req.body.solarGenerator, head: req.body.head, chargeRegulator: req.body.chargeRegulator, socket: req.body.socket});
		ledLighthouse.solarGeneratorDate.push(req.body.solarGeneratorDate);
		ledLighthouse.accumulator.push(req.body.accumulator);
		ledLighthouse.headDate.push(req.body.headDate);
		ledLighthouse.accumulatorDate.push(req.body.accumulatorDate);
		ledLighthouse.chargeRegulatorDate.push(req.body.chargeRegulatorDate);
		ledLighthouse.socketDate.push(req.body.socketDate);

        await ledLighthouse.save();
		req.flash("success", "Επιτυχής εγγραφή");
        res.redirect('/');
	}
	catch(e) {
		req.flash("error", e.message);
		res.redirect('/ledLighthouses/registerLed');
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

		if(req.body.solarGeneratorDate != undefined && req.body.solarGeneratorDate != null && req.body.solarGeneratorDate != ""){
			ledLightHouse.solarGeneratorDate.push(req.body.solarGeneratorDate);
		}
		if(req.body.accumulator != undefined && req.body.accumulator != null && req.body.accumulator != ""){
			ledLightHouse.accumulator.push(req.body.accumulator);
		}
		if(req.body.headDate != undefined && req.body.headDate != null && req.body.headDate != ""){
			ledLightHouse.headDate.push(req.body.headDate);
		}
		if(req.body.accumulatorDate != undefined && req.body.accumulatorDate != null && req.body.accumulatorDate != ""){
			ledLightHouse.accumulatorDate.push(req.body.accumulatorDate);
		}
		if(req.body.chargeRegulatorDate != undefined && req.body.chargeRegulatorDate != null && req.body.chargeRegulatorDate != ""){
			ledLightHouse.chargeRegulatorDate.push(req.body.solarGeneratorDate);
		}
		if(req.body.socketDate != undefined && req.body.socketDate != null && req.body.socketDate != ""){
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
    res.redirect('/');
}));


module.exports = router;