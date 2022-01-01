const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LedLightSchema = new Schema({
    aef: String,
    lighthouse: String,
    name: String,
    features: String,
    location: String,
    solarGenerator: String,
    head: String,
    accumulator: String,
    chargeRegulator: String,
    socket: String,
    placementDate: {
        type: Array,
        default: [Date]
    },
    technicians: [{
	    	type: Schema.Types.ObjectId,
	    	ref: "Disposal"
    }]
});

module.exports = mongoose.model("LedLight", LedLightSchema);