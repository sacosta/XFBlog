var SERVER_URL = 'localhost';
var SERVER_PORT = 27017;
var BLOG_DB_NAME = 'blogdb';

var mongo = require('mongodb');

var server = new mongo.Server(SERVER_URL, SERVER_PORT, {auto_reconnect: true});

var db = new mongo.Db(BLOG_DB_NAME, server);

/*
db.open(function (err, db) {
    if (!err) {
        console.log('conneted!');
        db.collection('posts', {strict: true}, function (err, collection) {
            if (err) {
                console.log('Creating collection');
                db.createCollection('posts', {strict: true}, function (err, collection) {
                }
            )
        }
    })*/
