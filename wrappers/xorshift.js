'use strict';
var xorshift = require('xorshift');

module.exports = function(iters, cb) {
   var sum = 0,
       n = iters;
   while(--n) {
      sum += xorshift.random(); //2^53
   }
   if(sum < 0 || sum > iters) {
      return cb(new Error('bad sum'));
   }

   return cb(null);
};
