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
		const ledLighthouse = new LedLight({aef: req.body.aef, lighthouse: req.body.lighthouse, features: req.body.features, location: req.body.location, solarGenerator: req.body.solarGenerator, head: req.body.head, accumulator: req.body.accumulator, chargeRegulator: req.body.chargeRegulator, socket: req.body.socket, placementDate: req.body.placementDate});
        await ledLighthouse.save();
		req.flash("success", "Επιτυχής εγγραφή");
        res.redirect('/');
	}
	catch(e) {
		req.flash("error", e.message);
		res.redirect('/ledLighthouses/registerLed');
	}
}));

module.exports = router;