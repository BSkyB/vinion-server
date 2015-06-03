var exec = require('child_process').exec;
var path = require('path');
var fs = require('fs');
var speech_recognition = require("../services/speech-recognition");

var extractAudio = function(videoPath) {
    var parsedVideoPath = path.parse(videoPath);
    var outAudioFile = "out/" + parsedVideoPath.name + ".wav";

    var outVideoFile = "out/" + parsedVideoPath.name + ".mp4";
    fs.unlink(outAudioFile, function (err) {
    });

    var command = 'ffmpeg -i ' + videoPath + ' -ar 16000 -ac 1 ' + outAudioFile;
    exec(command, function (error, stdout, stderr) {
        fs.rename(videoPath, outVideoFile);
        speech_recognition.extractText(outAudioFile);
    });
};

module.exports.extractAudio = extractAudio;