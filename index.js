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
           timeSum: stats.sum === null ? '-' : (stats.timeSum / 1e9).toPrecision(4),
           opSum: stats.opSum === null ? '0' : stats.opSum.toExponential(),
           mean: stats.opMean === null ? '-' : stats.opMean.toPrecision(6),
           sd: stats.opSd === null ? '-' : stats.opSd.toPrecision(6)
        };

        console.log('%s ns/op ± %s', statsDisplay.mean, statsDisplay.sd);
        console.log('(%s ops in %ss)\n', statsDisplay.opSum, statsDisplay.timeSum);
        done();
    });
});
