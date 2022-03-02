const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoreRoomSchema = new Schema({
    accumulators: {
        type: Array,
        default: [String]
    }
});

module.exports = mongoose.model("StoreRoom", StoreRoomSchema);
