/**
 * Created by sacosta on 01/01/15.
 */

var _ = require('lodash');

var xfFunctional = require('./commons/functional');

var configValues = {
    database: {
        url: 'databases.development.com',
        port: 1008,
        user: 'user',
        password: 'password'
    },

    frontend : {
        viewsDirectory : '../frontend/views',
        staticFiles : '../frontend/public/'
    }
};



var getProperty = function (property, defaultValue) {
    var args,
        result;

    if (!xfFunctional.existy(property)) return null;

    args = property.split('.');

    result = _.reduce(args, function (currentConfig, arg) {
        if (!xfFunctional.existy(currentConfig)) return undefined;

        currentConfig = configValues[arg];
        return currentConfig;
    }, {});

    return result || defaultValue;
};

module.exports = getProperty;