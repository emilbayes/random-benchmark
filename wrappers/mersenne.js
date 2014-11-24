'use strict';
var mersenne = require('mersenne');

mersenne.seed(1);

module.exports = function(iters, cb) {
   var sum = 0,
       n = iters;

   while(n--) {
      //mersenne.rand(N) generates a random integer in the range [0, N)
      //se we normalise with N, to get a double in the range [0, 1)
      sum += mersenne.rand(9007199254740992)/9007199254740992;
   }

   if (sum < 0 || sum > iters) {
      return cb(new Error('bad sum'));
   }

   return cb(null);
};
