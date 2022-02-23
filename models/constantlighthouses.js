const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const constantLightSchema = new Schema({
    aef: {
        type: String,
        unique: true
    },
    lighthouse: String,
    location: String,
    position: String,
    colour: String,
    sections: String,
    dateModified: String,
    lamp: String,
    lampDate: {
        type: Array,
        default: [Date]
    },
    torchSocket: String,
    torchSocketDate: {
        type: Array,
        default: [Date]
    },
    accessory: [String],
    accessoryDate: {
        type: Array,
        default: [Date]
    },
    technicians: [{
	    	type: Schema.Types.ObjectId,
	    	ref: "Technician"
    }]
});

module.exports = mongoose.model("constantLight", constantLightSchema);
