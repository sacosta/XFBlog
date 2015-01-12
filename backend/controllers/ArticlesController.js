/**
 * Created by sacosta on 06/01/15.
 */

var HttpCodes = require('../commons/HttpCodes.js');

var PersistenceLayer = require('../services/PersistenceLayer');
var ARTICLES_SERVICE = 'Articles';

exports.list = function (params, callback) {
    var articlesService = PersistenceLayer.getService(ARTICLES_SERVICE);
    articlesService.list(params, function (error, results) {
        if (error) {
            callback({errors: error, code: HttpCodes.INTERNAL_SERVER_ERROR});
            return;
        }

        callback({errors: null, code: HttpCodes.OK, results: results});
    });
};

exports.insert = function () {

};

exports.update = function () {

};


exports.delete = function () {

};

exports.create = function () {

};