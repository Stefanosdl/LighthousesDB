const mongoose = require("mongoose");
const Sailor = require("../models/sailors");
const Disposal = require("../models/disposal");
const datediff = require("../utils/calculateDate");

dbUrl = "mongodb://127.0.0.1:27017/Navy";

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
    //create sailor
    await Sailor.findByIdAndRemove("61bdbffdc1cc45aeb4d29e72")
    // await Disposal.deleteMany({});
    // await Sailor.deleteMany({});

    // var sailor = new Sailor({
    //     grade: "Ναύτης",
    //     firstname: "Στέφανος",
    //     lastname: "Διανέλλος",
    //     registration: "84256",
    //     adeptness: "ΗΝ/ΗΥ",
    //     arrival: "2021-10-04",
    //     classification: "2021-09-15",
    //     release: "2022-09-15",
    //     serve: 12,
    //     defaultTimeoff: 18,
    //     totalTimeoff: 18,
    //     police: "ΑΤ. Κερατσινίου/Δραπετσώνας",
    //     father: "Ορέστης-Κωνσταντίνος",
    //     mother: "Γαλήνη",
    //     address: "Σαμοθράκης 17",
    //     esso: "Γ",
    //     fitness: "Ι1",
    //     marital: "Άγαμος",
    //     origin: "Ελληνική",
    //     driver: "ΟΧΙ",
    //     knowledge: "Πτυχίο Πληροφορικής και Τηλεπικοινωνιών ΕΚΠΑ",
    //     home: "2104005604",
    //     mobile: "6989632167",
    //     isReleased: "ΟΧΙ",
    //     changes: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    // });
    // // create disposal
    // var disposal = new Disposal({
    //     startTime: new Date("2021-10-04"),
    //     returnTime: new Date("2021-11-04"),
    //     daysCount: 0
    // });

    // var countDays = datediff.calculateDate(disposal.startTime, disposal.returnTime);
    // disposal.daysCount = countDays;
    // sailor.disposals.push(disposal);
    // await disposal.save();
    // await sailor.save();
}

seedDB().then(() => {
    mongoose.connection.close();
})