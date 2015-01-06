/**
 * Created by sacosta on 31/12/14.
 */

(function () {
    angular.module('xf.services.utils', [])
        .factory('Utils', function () {
            var existy = function (value) {
                return value != null;
            };

            var trusthy = function (value) {
                return value !== false && existy(value);
            };

            return {
                existy: existy,
                trusty: trusthy
            }
        });
}());