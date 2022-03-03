const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoreRoomSchema = new Schema({
    accumulators: {
        type: Array,
        default: [String]
    },
    solarGenerators: {
        type: Array,
        default: [String]
    },
    heads: {
        type: Array,
        default: [String]
    },
    lamps: {
        type: Array,
        default: [String]
    }
});

module.exports = mongoose.model("StoreRoom", StoreRoomSchema);
