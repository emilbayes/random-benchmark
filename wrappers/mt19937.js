'use strict';
var mt19937 = require('mt19937');
mt19937.Seed(1);

module.exports = function(iters, cb) {
   try {
      while(iters--) {
         mt19937.NextDouble(); //2^53
      }
   }
   catch(e) {
      return cb(e);
   }

   return cb(null);
};
