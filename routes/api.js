var express = require('express');
var router = express.Router();
var http = require("http");

router.get('/search', function(req, res, next) {
    var searchRequest = "http://localhost:9200/videos/_search?q=" + req.param("q");
    console.log(searchRequest);
    http.get(searchRequest, function(response) {
        console.log("Got response: " + res.statusCode);
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {

            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            res.setHeader('content-type', 'text/javascript');
            res.header("Access-Control-Allow-Origin", "*");
            res.send(body);
        });

    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
});

module.exports = router;
