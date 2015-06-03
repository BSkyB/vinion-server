var exec = require('child_process').exec;

var extractText = function (audioPath) {
    var command = 'pocketsphinx_continuous -infile ' + audioPath + ' -hmm en-us -lm en-us.lm.dmp 2> /dev/null';
    exec(command, function (error, stdout, stderr) {
        console.log(error);
        console.log(stdout);
    });
};

module.exports.extractText = extractText;