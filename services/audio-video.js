var exec = require('child_process').exec;
var path = require('path');
var fs = require('fs');

var extractAudio = function(videoPath) {
    var parsedVideoPath = path.parse(videoPath);
    var outAudioFile = "out/" + parsedVideoPath.name + ".wav";

    fs.unlink(outAudioFile, function (err) {
        if (err) throw err;
    });

    var command = 'ffmpeg -i ' + videoPath + ' -ar 16000 -ac 1 ' + outAudioFile;
    exec(command, function (error, stdout, stderr) {
        console.log("stdout: " + stdout);
    });
};

module.exports.extractAudio = extractAudio;