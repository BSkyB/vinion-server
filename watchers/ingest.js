var chokidar = require('chokidar');
var audio_video  = require('../services/audio-video');

var watcher = chokidar.watch('in', {
    ignored: /[\/\\]\./,
    persistent: true
});

var log = console.log.bind(console);

watcher
    .on('add', function(path) {
        log('File', path, 'has been added');
        audio_video.extractAudio(path);
    })
    .on('error', function(error) { log('Error happened', error); })
    .on('ready', function() { log('Initial scan complete. Ready for changes.'); });

