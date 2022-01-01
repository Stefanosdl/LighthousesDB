const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TechnicianSchema = new Schema({
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
    }
});

module.exports = mongoose.model("Technician", TechnicianSchema);