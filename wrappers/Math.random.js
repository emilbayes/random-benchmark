'use strict';
module.exports = function(iters, cb) {
   var sum = 0,
       n = iters;

   while(n--) {
      sum += Math.random();
   }

   if (sum < 0 || sum > iters) {
      return cb(new Error('bad sum'));
   }

   return cb(null);
};
