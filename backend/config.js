/**
 * Created by sacosta on 01/01/15.
 */

var _ = require('lodash');

var xfFunctional = require('./commons/functional');

var configValues = {
    persistence: {
        defaultModule: 'mongo', //must match with some key of modules
        modules: {
            mongo: {
                url: 'databases.development.com',
                port: '27017',
                options: {autoreconnect: false, safe: true}
            }
        }
    },

    frontend: {
        viewsDirectory: '../frontend/views',
        staticFiles: '../frontend/public/'
    }
};


var getProperty = function (property, defaultValue) {
    var args,
        result,
        initialValues;

    if (!xfFunctional.existy(property)) return null;

    args = property.split('.');
    initialValues = configValues[_.first(args)]; //We need at least the parent property as root value, to pass as initial argument to reduce function.
    args = _.rest(args);

    result = _.reduce(args, function (currentConfig, arg) {
        if (!xfFunctional.existy(currentConfig)) return undefined;

        currentConfig = currentConfig[arg];
        return currentConfig;
    }, initialValues);

    return result || defaultValue;
};

exports.getProperty = getProperty;