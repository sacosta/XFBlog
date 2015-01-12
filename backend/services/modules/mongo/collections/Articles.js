/**
 * Created by sacosta on 07/01/15.
 */

'use strict';

var COLLECTION_NAME = 'Article';


var list = function (dbConnection, params, callback) {
    var articlesCollection = dbConnection.collection('articles');
    articlesCollection.find({}).toArray(callback);
    //.toArray(callback);
};

var findById = function (dbConnection, id, callback) {
};


var createArticle = function (dbConnection, id, callback) {

};


module.exports = function (dbConnection) {
    return {
        findById : findById.bind(null, dbConnection),
        createArticle: createArticle.bind(null, dbConnection),
        list : list.bind(null, dbConnection)
    };
};