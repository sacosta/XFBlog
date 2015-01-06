/**
 * Created by sacosta on 24/12/14.
 */

(function () {
    'use strict';

    var moduleRequirements = [ 'ngRoute', 'xf.admin.controller.posts'];

    var config = ['$routeProvider', '$locationProvider',
        function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/admin/posts/', { templateUrl : '/partials/admin/posts/list.html'})
                .when('/posts/insert', { templateUrl: '/partials/posts/insert.html'})
                .otherwise('/posts/insert');
        }];

    angular.module('xfblog', moduleRequirements)
        .config(config);
})();