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
    await Technician.deleteMany({});
    await LedLight.deleteMany({});
    await AutoLight.deleteMany({});
}

seedDB().then(() => {
    mongoose.connection.close();
})