var exec = require('child_process').exec;
var elasticsearch = require('../services/elasticsearch');

var extractText = function (audioPath, videoPath) {
    var command = 'pocketsphinx_continuous -infile ' + audioPath + ' -time yes -hmm en-us -lm en-us.lm.dmp 2> /dev/null';
    exec(command, function (error, stdout, stderr) {
        console.log(error);
        elasticsearch.indexVideo(videoPath, stdout);
    });
};

module.exports.extractText = extractText;