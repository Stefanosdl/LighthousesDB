const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lightBeaconSchema = new Schema({
    aef: {
        type: String,
        unique: true
    },
    lighthouse: String,
    features: String,
    location: String,
    position: String,
    colour: String,
    dateModified: String,
    stigma: {
        x: { type: String },
        y: { type: String }
    },
    lightingMachine: {
            manufacturer: { type: String },
            type: { type: String },
            counter: { type: Number }
    },
    lightingMachineDate: Date,
    reflector: {
            manufacturer: { type: String },
            type: { type: String },
            counter: { type: Number }
    },
    reflectorDate: Date,
    signs: {
            manufacturer: { type: String },
            type: { type: String },
            counter: { type: Number }
    },
    signsDate: Date,
    type: String,
    usedChain: Number,
    immersionDepth: Number,
    stateri: {
            type: { type: String },
            counter: { type: Number }
    },
    alysos: {
            type: { type: String },
            counter: { type: Number }
    },
    agkyrioChain: {
            type: { type: String },
            counter: { type: Number }
    },
    streptyras: {
            type: { type: String },
            counter: { type: Number }
    },
    navyKey: {
            type: { type: String },
            counter: { type: Number }
    },
    agkyrio: {
            type: { type: String },
            counter: { type: Number }
    },
    technicians: [{
	    	type: Schema.Types.ObjectId,
	    	ref: "Technician"
    }]
});

module.exports = mongoose.model("lightBeacon", lightBeaconSchema);
