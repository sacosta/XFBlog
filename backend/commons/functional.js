/**
 * Created by sacosta on 01/01/15.
 */

var existy = function (value) {
    return value != null;
};


var trusthy = function (value) {
  return value !== false && existy(value);
};


exports.existy = existy;
exports.trusthy = trusthy;