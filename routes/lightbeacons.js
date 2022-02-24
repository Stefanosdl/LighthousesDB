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

module.exports = router;
