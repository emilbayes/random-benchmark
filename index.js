'use strict';
var fs = require('fs'),
    path = require('path'),
    fork = require('child_process').fork;

var async = require('async');

var wrappers = fs.readdirSync(path.join(__dirname, 'wrappers'))
        .map(function(filename) {
            return {
                name: path.basename(filename, '.js'),
                wrapper: path.join(__dirname, 'wrappers', filename)
            };
        });

async.eachSeries(wrappers, function(wrapper, done) {
    var runner = fork(path.join(__dirname, 'worker.js'));

    console.log('Benchmarking: %s', wrapper.name);
    runner.send(wrapper);
    runner.on('message', function(stats) {
        var statsDisplay = {
           mean: stats.opMean === null ? '-' : stats.opMean.toPrecision(6),
           sd: stats.opSd === null ? '-' : stats.opSd.toPrecision(6)
        };

        console.log('%s ns/op ± %s\n', statsDisplay.mean, statsDisplay.sd);
        done();
    });
});
