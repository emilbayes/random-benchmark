'use strict';
var xorshift = require('xorshift');

module.exports = function(iters, cb) {
   try {
      while(iters--) {
         xorshift.random(); //2^53
      }
   }
   catch(e) {
      return cb(e);
   }

   return cb(null);
};
