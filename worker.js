'use strict';
var ProgressBar = require('progress');

var Benchmark = require('./benchmark');

process.on('message', function(job) {
   var bar = new ProgressBar('[:bar] :current / :total', {
      total: Benchmark.TOTAL_SAMPLES,
      complete: '=',
      incomplete: '-',
      width: 50
   });

   try {
      var wrapper = require(job.wrapper);
      var benchmark = new Benchmark(wrapper);

      benchmark.on('progress', function() {
         bar.tick();
      });

      benchmark.once('finished', function(stats) {
         process.send({
            opMean: stats.mean() / Benchmark.ITERATIONS_PER_SAMPLE,
            opSd: stats.sd() / Math.sqrt(Benchmark.ITERATIONS_PER_SAMPLE)
         });
         process.exit(0);
      });

      benchmark.run();
   }
   catch(ex) {
      process.send({
         opMean: NaN,
         opSd: NaN,
         error: ex
      });
      process.exit(1);
   }
});
