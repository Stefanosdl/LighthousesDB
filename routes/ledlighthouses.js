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
		console.log(e.message)
		req.flash("error", e.message);
		res.redirect('/ledLighthouses/registerLed');
	}
}));


module.exports = router;