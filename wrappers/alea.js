'use strict';
var Alea = require('alea');

var r = new Alea(1);

module.exports = function(iters, cb) {
   var sum = 0,
       n = iters;

   while(n--) {
      sum += r();
   }

   if(sum < 0 || sum > iters) {
      return cb(new Error('bad sum'));
   }

   return cb(null);
};
