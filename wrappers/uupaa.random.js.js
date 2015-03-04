'use strict';
var Random = require('uupaa.random.js');

var r = new Random(1);

module.exports = function(iters, cb) {
   var sum = 0,
       n = iters;

   while(n--) {
      sum += r.next()/9007199254740992; //2^53
   }

   if(sum < 0 || sum > iters) {
      return cb(new Error('bad sum'));
   }

   return cb(null);
};
