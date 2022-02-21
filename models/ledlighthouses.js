const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LedLightSchema = new Schema({
    aef: {
        type: String,
        unique: true
    },
    lighthouse: String,
    features: String,
    location: String,
    position: String,
    colour: String,
    sections: String,
    solarGenerator: [String],
    solarGeneratorDate: {
        type: Array,
        default: [Date]
    },
    head: String,
    headDate: {
        type: Array,
        default: [Date]
    },
    accumulator: [String],
    accumulatorDate: {
        type: Array,
        default: [Date]
    },
    chargeRegulator: String,
    chargeRegulatorDate: {
        type: Array,
        default: [Date]
    },
    socket: String,
    socketDate: {
        type: Array,
        default: [Date]
    },
    accumulatorDateGroups: {
        type: Map
    },
    solarGeneratorDateGroups: {
        type: Map
    },
    technicians: [{
	    	type: Schema.Types.ObjectId,
	    	ref: "Technician"
    }]
});

module.exports = mongoose.model("LedLight", LedLightSchema);