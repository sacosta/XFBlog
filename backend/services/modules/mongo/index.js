/**
 * Created by sacosta on 07/01/15.
 */

'use strict';

var lodash = require('lodash');
var mongo = require('mongodb').MongoClient;

var PERSISTENCE_MODULE_NAME = 'mongo';
var DB_NAME = 'xfblog';
var COLLECTIONS_DIRECTORY = './collections';

var db;
var loadedServices = {}; //Cache of loaded services

var getService = function (serviceName) {
    if (loadedServices[serviceName]) return loadedServices[serviceName](db);

    loadedServices[serviceName] = require(require('path').join(__dirname, COLLECTIONS_DIRECTORY, serviceName));
    return loadedServices[serviceName](db);
};


var init = function (config) {
    var options = lodash.extend({auto_reconnect: true, safe: true}, config.options),
        url = 'mongodb://' + config.url + ':' + config.port + '/' + (config.dbname || DB_NAME);

    try {
        mongo.connect(url, function (error, dbConnection) {
            db = dbConnection;
        });
    } catch (e) {
        console.error(e);
        return false;
    }

    return true;
};

module.exports = {
    NAME: PERSISTENCE_MODULE_NAME,
    getService: getService,
    init: init
};