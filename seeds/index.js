const mongoose = require("mongoose");
const { findById } = require("../models/autolighthouses");
const AutoLight = require("../models/autolighthouses");
const LedLight = require("../models/ledlighthouses");
const Technician = require("../models/technician");

dbUrl = "mongodb://127.0.0.1:27017/Lighthouses";

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    //delete collections
    // await Technician.deleteMany({});
    // await LedLight.deleteMany({});
    // await AutoLight.deleteMany({});
    const auto = await AutoLight.findById("61e3bc104500476fb046db92");

    var myMap = new Map();

    myMap.set("1",["A"]);
    myMap.set("1",["B", ...myMap.get('1')]);

    // auto.groups = new Map();
    console.log(myMap)
    // auto.groups.set("1", [])
    // auto.groups.get("1").push("2")
    // auto.groups.get("1").push("2")
    // auto.groups.set("2", [])
    // auto.groups.get("2").push("2")
    // auto.groups.get("2").push("2")
    // console.log(auto.groups)
}

seedDB().then(() => {
    mongoose.connection.close();
})