const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AutoLightSchema = new Schema({
    aef: String,
    lighthouse: String,
    name: String,
    features: String,
    location: String,
    lighter: String,
    solarGenerator: String,
    head: String,
    lamp: String,
    accumulator: String,
    generatorSocket: String,
    torchSocket: String,
    photocell: String,
    accessory: String,
    placementDate: {
        type: Array,
        default: [Date]
    },
    technicians: [{
	    	type: Schema.Types.ObjectId,
	    	ref: "Technician"
    }]
});

module.exports = mongoose.model("AutoLight", AutoLightSchema);