const express = require("express");
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ConstantLight = require("../models/constantlighthouses");
const Technician = require("../models/technician");
const middleware = require("../utils/middleware");
const moment = require("moment");

router.get("/registerConstant", (req, res) => {
	res.render("registerConstant");
});

router.post("/registerConstant", catchAsync(async (req, res, next) => {
    try {
		const constantLighthouse = new ConstantLight({ ...req.body });
		
		moment.locale('el');
		constantLighthouse.dateModified = moment().format('LL');

        await constantLighthouse.save();
		req.flash("success", "Επιτυχής εγγραφή");
        res.redirect('/');
	}
	catch(e) {
		req.flash("error", e.message);
		res.redirect('/constantLighthouses/registerConstant');
	}
}));

router.post("/search/:id", catchAsync(async (req, res) => {
	const searchedConstant = await ConstantLight.find({_id: req.params.id}).populate("technicians");
	
	res.render("searchConstant", { searchedConstant});
}));

module.exports = router;
