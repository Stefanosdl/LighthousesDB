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
    },
    colours: {
        type: Array,
        default: [String]
    },
    alternators: {
        type: Array,
        default: [String]
    },
    lighters: {
        type: Array,
        default: [String]
    },
    generatorSockets: {
        type: Array,
        default: [String]
    },
    torchSockets: {
        type: Array,
        default: [String]
    },
    photocells: {
        type: Array,
        default: [String]
    },
    accessorys: {
        type: Array,
        default: [String]
    },
    technicians: {
        type: Array,
        default: [String]
    },
    locations: {
        type: Array,
        default: [String]
    },
    lightingMachineMan: {
        type: Array,
        default: [String]
    },
    lightingMachineType: {
        type: Array,
        default: [String]
    },
    reflectorMan: {
        type: Array,
        default: [String]
    },
    reflectorType: {
        type: Array,
        default: [String]
    },
    signsMan: {
        type: Array,
        default: [String]
    },
    signsType: {
        type: Array,
        default: [String]
    },
    type: {
        type: Array,
        default: [String]
    },
    stateriType: {
        type: Array,
        default: [String]
    },
    alysosType: {
        type: Array,
        default: [String]
    },
    agkyrioChainType: {
        type: Array,
        default: [String]
    },
    streptyrasType: {
        type: Array,
        default: [String]
    },
    navyKeyType: {
        type: Array,
        default: [String]
    },
    agkyrioType: {
        type: Array,
        default: [String]
    }
});

module.exports = mongoose.model("StoreRoom", StoreRoomSchema);
