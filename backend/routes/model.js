var mongo = require('mongodb');

var Server = mongo.Server, Db = mongo.Db, BSON = mongo.BSONPure, ObjectId = mongo.ObjectID;
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('blogdb', servl);

db.open(function (err, db) {
    if (!err) {
        console.log('connected!');
        db.collection('posts', {stric: true}, function (err, collection) {
            if (err) {
                console.log("The collection doesn't exits , creating sample data");
                createSampleData();
            }
        });
    }
});

exports.findById = function(req,res){
    var id = req.params.id;
    console.log('Retrieving Post:' +id);
    db.collection('posts', function(err,collection){
        collection.findOne({'_id':new ObjectId(id)}, function(err,item){
            if(err){
                console.log(err);
            }
            console.log(item);
            res.send(item);
        });
    });
};

exports.findAll = function(req,res){
    db.collection = ('posts',function(err,collection){

    })

}
