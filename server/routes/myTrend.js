var express = require('express');
var router = express.Router();

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
var AWS = require("aws-sdk");
AWS.config.update(awsConfig);
var docClient = new AWS.DynamoDB.DocumentClient();
var table = "TwitterEnalyst";

// Enter http://localhost:3000/myTrend
// This route is used to scan Dynamo and get the trending keywords on our website 
router.get('/', async (req, res, next) => {
    const result = await docClient.scan({ TableName: table }, (err, data) => {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            // print all the movies
            console.log("/myTrend - Scan succeeded.");
            var keywords = [];
            data.Items.forEach(function (item) {
                keywords.push(item.keywords);
            });
            console.log(keywords);
            res
                .status(200)
                .json({ error: false, data: keywords });
        }
    })

});

module.exports = router;