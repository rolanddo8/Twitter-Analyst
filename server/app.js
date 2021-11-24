var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// --- Rodo ---
var AWS = require("aws-sdk");
const { env } = require("process");
var dotenv = require("dotenv");
dotenv.config();

var awsConfig = {
    region: "ap-southeast-2",
    endpoint: process.env.AWS_ENDPOINT,
    accessKeyId: process.env.AWS_KEYID,
    secretAccessKey: process.env.AWS_SECRETKEY,
};
AWS.config.update(awsConfig);
// ------------
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var twitterRouter = require("./routes/twitter");
var googleTrendRouter = require("./routes/googleTrend")
var myTrendRouter = require("./routes/myTrend")
const { timeStamp } = require("console");
var app = express();



var cors = require('cors')

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors()) // Use this after the variable declaration

app.use("/users", usersRouter);
app.use("/twitter", twitterRouter);
app.use("/googleTrend", googleTrendRouter);
app.use("/myTrend", myTrendRouter);

// Serve out any static assets correctly
// app.use(express.static('../client/build'))
app.use('/static', express.static(path.join(__dirname, '../client/build//static')));
app.use('*', function (req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, '../client/build/') });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;