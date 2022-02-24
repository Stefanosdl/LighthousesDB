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

module.exports = router;
