/**
 * Created by sacosta on 06/01/15.
 */

(function () {
    'use strict';

    angular.module('xf.admin.controller.posts', ['xf.services.post'])
        .controller('AdminListController', ['$scope', 'Post',
            function ($scope, Post) {
                $scope.posts = Post.query();
            }]);
}());