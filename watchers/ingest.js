var chokidar = require('chokidar');

var watcher = chokidar.watch('in', {
    ignored: /[\/\\]\./,
    persistent: true
});

var log = console.log.bind(console);

watcher
    .on('add', function(path) { log('File', path, 'has been added'); })
    .on('error', function(error) { log('Error happened', error); })
    .on('ready', function() { log('Initial scan complete. Ready for changes.'); })

