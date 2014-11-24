'use strict';
var mt19937 = require('mt19937');
mt19937.Seed(1);

module.exports = function(iters, cb) {
   var sum = 0,
       n = iters;

   while(n--) {
      sum += mt19937.NextDouble(); //2^53
   }

   if(sum < 0 || sum > iters) {
      return cb(new Error('bad sum'));
   }

   return cb(null);
};
