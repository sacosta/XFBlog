/**
 * Created by sacosta on 07/01/15.
 */

'use strict';
var _ = require('lodash');
var fs = require('fs');
var path = require('path');

var MODULES_DIRECTORY = path.join(__dirname, 'modules');
var PERSISTENCE_CONFIGURATION = 'persistence.modules';

var defaultModule;

var initialized = false;
var loadedTypes = {};

var getExistingPersistenceModules = function () {
    var modules = fs.readdirSync(MODULES_DIRECTORY),
        isValidModule,
        insertModule;


    isValidModule = function (module) {
        try {
            if (typeof module.getService !== 'function' ||
                typeof module.init !== 'function' ||
                typeof module.NAME !== 'string') return false;
        } catch (e) {
            console.error(e);
            return false;
        }
        return true;

    };

    insertModule = function (module) {
        var modulePath = path.join(MODULES_DIRECTORY, module),
            stats = fs.statSync(modulePath),
            existingModule;
        console.log(modulePath);

        if (!stats || !stats.isDirectory()) return false;

        try {
            existingModule = require(path.join(modulePath, 'index.js'));
        } catch (e) {
            console.error('Unable to load index.js for persistence module: ', module);
            return false;
        }

        if (!isValidModule(existingModule)) {
            console.warn('A persitance module: ', modulePath, ' does not meet module signature requirements');
            return false;
        }

        if (loadedTypes[existingModule.NAME]) {
            console.warn('A persistence module ', existingModule.NAME, ' already exists');
            return false;
        }

        loadedTypes[existingModule.NAME] = existingModule;
        return true;
    };

    _.forEach(modules, insertModule);
    return loadedTypes;
};

var initPersistanceLayer = function (config) {
    var persistanceModules;

    if (!config) {
        throw "We can't find a valid configuration";
    }

    persistanceModules = getExistingPersistenceModules();
    defaultModule = config.getProperty('persistence.defaultModule') || 'mongo';

    if (persistanceModules.length < 0) {
        throw 'Not valid persistence modules found';
    }

    _.forEach(persistanceModules, function (persistenceModule) {
        persistenceModule.init(config.getProperty([PERSISTENCE_CONFIGURATION, persistenceModule.NAME].join('.'), {}));
    });

    initialized = true;
};

var getService = function (moduleName) {
    var defaultType = loadedTypes[defaultModule] || _.values(loadedTypes)[0];
    return defaultType.getService(moduleName);
};


exports.init = function (config) {
    if (initialized) return false;
    initPersistanceLayer(config);
};

exports.getService = getService;