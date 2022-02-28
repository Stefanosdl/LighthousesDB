const mongoose = require("mongoose");
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
    // const auto = await AutoLight.findById("61e3bc104500476fb046db92");

    // var array1 = ["1", "2134231432"]
    // var array2 = ["aqsdrewfr", "sdfef", "1"]

    // array1.splice(0, array1.length, ...array2);
    // console.log(array1)
    // var myMap = new Map();

    // // myMap.set("1",["A"]);
    // // myMap.set("1",["B", ...myMap.get('1')]);

    // myMap.set("1", 0);
    // myMap.set("1", myMap.get("1")+2)
    // myMap.set("1", myMap.get("1")*2)
    // console.log(myMap)
    
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
});
