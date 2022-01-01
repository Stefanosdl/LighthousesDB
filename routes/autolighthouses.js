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
		const autoLighthouse = new AutoLight({aef: req.body.aef, lighthouse: req.body.lighthouse, features: req.body.features, location: req.body.location, lighter: req.body.lighter, solarGenerator: req.body.solarGenerator, head: req.body.head, accumulator: req.body.accumulator, chargeRegulator: req.body.chargeRegulator, lamp: req.body.lamp, generatorSocket: req.body.generatorSocket, torchSocket: req.body.torchSocket, photocell: req.body.photocell, accessory: req.body.accessory, placementDate: req.body.placementDate});
        await autoLighthouse.save();
		req.flash("success", "Επιτυχής εγγραφή");
        res.redirect('/');
	}
	catch(e) {
		req.flash("error", e.message);
		res.redirect('/ledLighthouses/registerAuto');
	}
}));

module.exports = router;