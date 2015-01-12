/**
 * Created by sacosta on 10/01/15.
 */

var express = require('express');
var router = express.Router();

var _ = require('lodash');

var ArticlesController = require('../../controllers/ArticlesController');

/* GET home page. */
router.get('/', function(req, res) {
    var params = _.extend({}, req.query);
    ArticlesController.list(params, function (result) {
        res.send(result.error ? result.code : result.response);
    });
});


module.exports = router;
