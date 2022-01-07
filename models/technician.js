const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TechnicianSchema = new Schema({
    technician: String,
    date: Date,
    description: String,
    suggests: String
});

module.exports = mongoose.model("Technician", TechnicianSchema);