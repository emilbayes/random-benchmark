'use strict';
var EventEmitter = require('events').EventEmitter,
    util = require('util');

var async = require('async'),
    summary = require('summary');

function Benchmark(wrapper) {
   EventEmitter.call(this);
   this.wrapper = wrapper;
}
util.inherits(Benchmark, EventEmitter);
module.exports = Benchmark;

Benchmark.prototype.run = function() {
   var self = this,
       tick;

   async.timesSeries(Benchmark.TOTAL_SAMPLES,
      function progress(n, next) {
         tick = process.hrtime();
         self.wrapper(Benchmark.ITERATIONS_PER_SAMPLE, function(err) {
            self.emit('progress', n);
            next(err, process.hrtime(tick));
         });
      },
      function finished(err, hrtimes) {
         if(err) {
            console.error(err);
         }

         var samples = hrtimes.map(function(tock) {
            return tock[0] * 1e9 + tock[1];
         });

         self.emit('finished', summary(samples, false));
      }
   );
};

Benchmark.TOTAL_SAMPLES = 100;
Benchmark.ITERATIONS_PER_SAMPLE = 1e6;
