'use strict';
module.exports = function(iters, cb) {
   try {
      while(iters--) {
         Math.random();
      }
   }
   catch(e) {
      return cb(e);
   }

   return cb(null);
};
