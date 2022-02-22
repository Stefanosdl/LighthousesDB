const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AutoLightSchema = new Schema({
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
    lighter: String,
    alternator: String,
    alternatorDate: {
        type: Array,
        default: [Date]
    },
    lighterDate: {
        type: Array,
        default: [Date]
    },
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
    lamp: [String],
    lampDate: {
        type: Array,
        default: [Date]
    },
    accumulator: [String],
    accumulatorDate: {
        type: Array,
        default: [Date]
    },
    generatorSocket: String,
    generatorSocketDate: {
        type: Array,
        default: [Date]
    },
    torchSocket: String,
    torchSocketDate: {
        type: Array,
        default: [Date]
    },
    photocell: String,
    photocellDate: {
        type: Array,
        default: [Date]
    },
    accessory: [String],
    accessoryDate: {
        type: Array,
        default: [Date]
    },
    accumulatorDateGroups: {
        type: Map
    },
    lampDateGroups: {
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

module.exports = mongoose.model("AutoLight", AutoLightSchema);
