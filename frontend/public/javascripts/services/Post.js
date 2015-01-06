/**
 * Created by sacosta on 25/12/14.
 */

(function () {
    'use strict';

    angular.module('xf.services.post', ['ngResource'])
        .factory('Post', ['$resource', function ($resource) {
            return $resource('/api/posts/:id', {id: '@id'}, {
                query: {isArray: false}
            });
        }]);
}());