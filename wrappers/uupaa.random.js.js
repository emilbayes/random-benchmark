'use strict';
var Random = require('uupaa.random.js');

var r = new Random(1);

module.exports = function(iters, cb) {
   try {
      while(iters--) {
         r.value(); //2^53
      }
   }
   catch(e) {
      return cb(e);
   }

   return cb(null);
};
