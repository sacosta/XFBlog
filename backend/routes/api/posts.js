/**
 * Created by sacosta on 06/01/15.
 */

var _ = require('lodash');
var express = require('express');
var router = express.Router();

var PostController = require('../../controllers/PostController.js');

var processControllerResult = function (res, response) {
    if (result.error) {
        res.send(response.error);
        return;
    }

    res.send(response.results);
};


router.get('/', function (req, res) {
    var params = _.extends({limit: 25, offset: 0}, req.params);
    PostController.list(params, processControllerResult.bind(null, res));
});

router.get('/:id', function (req, res) {
    res.send('respond with a resource');
});

router.post('/', function (req, res) {
    res.send('respond with a resource');
});

router.put('/', function (req, res) {
    res.send('respond with a resource');
});

router.delete('/', function (req, res) {
    res.send('respond with a resource');
});

module.exports = router;
