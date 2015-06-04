var elasticsearch = require('elasticsearch');
var path = require('path');

var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'error'
});

client.ping({
    // ping usually has a 3000ms timeout
    requestTimeout: Infinity,

    // undocumented params are appended to the query string
    hello: "elasticsearch!"
}, function (error) {
    if (error) {
        console.trace('elasticsearch cluster is down!');
    } else {
        console.log('All is well');
    }
});
var processResult = function(stdout) {
    var lines = stdout.toString().split('\n');
    var results = [];
    var i = 0;
    lines.forEach(function(line) {
        var times = line.split(" ");
        var keyword = times[0];
        times.shift();
        var data = {};
        data[keyword] = times;
        results[i] = data;
        i++;
    });
    return results;
};

var indexVideo = function(filePath, data) {
    var autoText = processResult(data);
    console.log("file: " + filePath + " is indexed");
    var finalFilePath = path.parse(filePath);
    var url = "http://localhost:3000/videos/" + finalFilePath.base;
    client.index({
        index: 'videos',
        type: 'video',
        body: {
            url: url,
            fullText: data,
            keywords: autoText
        }
    }, function (error, response) {
        if(error){
            console.log(error);
        }
    });
};

module.exports.indexVideo = indexVideo;