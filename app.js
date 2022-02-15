const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const mongoSanitize = require("express-mongo-sanitize");
const catchAsync = require('./utils/catchAsync');
const LedLight = require("./models/ledlighthouses");
const AutoLight = require("./models/autolighthouses");
const maxDates = require("./utils/calculateMaxDates");


const autoLighthouseRoutes = require("./routes/autolighthouses");
const ledLighthouseRoutes = require("./routes/ledlighthouses");

const MongoDBStore = require("connect-mongo")(session);

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

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(mongoSanitize({
    replaceWith: "_"
}));

const secret = process.env.SECRET || "thisshouldbeabettersecret!";

const store = new MongoDBStore({
    url: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e)
});

const sessionConfig = {
    store,
    name: "session",
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.use("/autoLighthouses", autoLighthouseRoutes);
app.use("/ledLighthouses", ledLighthouseRoutes);

app.get("/", (req, res) => {
	res.render("index");
});

app.get("/search", catchAsync(async (req, res, next) => {
	try {
        const query = req.query.q;
        var maxCountLed = 0;
        var maxCountAuto = 0;
        if (query){
            const searchedLed = await LedLight.find({ $or:[ {aef: query}, {lighthouse: query} ]}).populate("technicians");
            if (searchedLed != undefined && searchedLed.length != 0) {
                maxCountLed = maxDates.getMostDatesLed(searchedLed[0]);
            }
            if(searchedLed == undefined || searchedLed.length == 0) {
                const searchedAuto = await AutoLight.find({ $or:[ {aef: query}, {lighthouse: query} ]}).populate("technicians");
                if (searchedAuto != undefined && searchedAuto.length != 0) {
                    maxCountAuto = maxDates.getMostDatesAuto(searchedAuto[0]);
                }
                
                if(searchedAuto == undefined || searchedAuto.length == 0) {
                    req.flash("error", "Η αναζήτησή σας δεν είχε κανένα αποτέλεσμα!");
                    res.redirect('/');
                }
                else {
                    res.render("searchAuto", { searchedAuto , maxCountAuto});
                }
            }
            else {
                res.render("searchLed", { searchedLed , maxCountLed});
            }
        }
        else {
            res.render("index");
        }

    }
    catch (e) {
        console.log(e.message);
        req.flash("error", e.message);
        res.redirect('/');
    }
}));

app.get("/suggestedWorks", catchAsync(async (req, res, next) => {
    const autoSuggests = await AutoLight.find({}).populate("technicians");
    const ledSuggests = await LedLight.find({}).populate("technicians");
	res.render("suggests", { autoSuggests, ledSuggests });
}));

app.listen(3000, () => {
    console.log("Listening in port 3000");
});