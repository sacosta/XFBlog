/**
 * Created by sacosta on 06/01/15.
 */

var async = require('async');
var PostsService = require('../services/PostService.js');
var HttpCodes = require('../commons/HttpCodes.js');

exports.list = function (params, callback) {
    PostsService.list(params, function (error, results) {
        if (error) {
            callback ({ errors : error, code: HttpCodes.INTERNAL_SERVER_ERROR});
            return;
        }

        callback( { errors: null, code: HttpCodes.OK, results: results } );
    });
};

exports.insert = function() {

};

exports.update = function() {

};


exports.delete = function () {

};

exports.create = function () {

};