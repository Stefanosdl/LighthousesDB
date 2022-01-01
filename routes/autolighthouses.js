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
		const autoLighthouse = new AutoLight({aef: req.body.aef, lighthouse: req.body.lighthouse, features: req.body.features, location: req.body.location, lighter: req.body.lighter, solarGenerator: req.body.solarGenerator, head: req.body.head, lamp: req.body.lamp, generatorSocket: req.body.generatorSocket, torchSocket: req.body.torchSocket, photocell: req.body.photocell, accessory: req.body.accessory});
		autoLighthouse.lighterDate.push(req.body.lighterDate);
		autoLighthouse.solarGeneratorDate.push(req.body.solarGeneratorDate);
		autoLighthouse.accumulator.push(req.body.accumulator);
		autoLighthouse.headDate.push(req.body.headDate);
		autoLighthouse.lampDate.push(req.body.lampDate);
		autoLighthouse.generatorSocketDate.push(req.body.generatorSocketDate);
		autoLighthouse.lampDate.push(req.body.lampDate);
		autoLighthouse.accumulatorDate.push(req.body.accumulatorDate);
		autoLighthouse.photocellDate.push(req.body.photocellDate);
		autoLighthouse.accessoryDate.push(req.body.accessoryDate);
		autoLighthouse.torchSocketDate.push(req.body.torchSocketDate);
		
        await autoLighthouse.save();
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