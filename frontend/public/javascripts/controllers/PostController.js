/**
 * Created by sacosta on 31/12/14.
 */


(function () {
    'use strict';

    angular.module('xf.controllers.post',
        ['xf.services.post'])
        .controller('PostController', [ '$scope',
            function ($scope) {

            }
        ])
        .controller('InsertPostController', ['$scope',
            'Post', 'Utils',
            function ($scope,
                      Post, Utils) {

                $scope.createPost = function (post) {
                    var postToSave;
                    if (!Utils.existy(post)) return;

                    postToSave = new Post(post);
                    postToSave.$save(function (postSaved){

                    }, function(error) {

                    });
                }
            }]);
}());