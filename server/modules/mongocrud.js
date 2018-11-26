var util = require('util') // Used to Inspect objects
var express = require('express'); // Used to make a express module
var db = require('../lib/mongo'); // A database pool link

var router = express.Router();
var debug = require('debug')('crud'); //debug - to use set im prompt: DEBUG=crud node ./bin/wwww

var BSON = require('mongodb'); // BSON is to make a BSON.ObjectID()

router.use(function (req, res, next) {
    // get collection name from url request
    var name = req.originalUrl.replace(/^\/([a-zA-Z0-9_]+).*/, '$1'); // get the first name in request url to make a collection

    debug('get connection:' + name);
    req.collection = db.get().collection(name); // get collection
    debug(util.inspect(req.body, false, null));
    next(); // go to next event
});

var remakeQuery = function (req, page) {
    var query = [];
    for (var key in req.query) {
        var value = req.query[key];
        if (key === "page" && page) {
            value = page;
        }
        query.push(key + "=" + value);
    }

    var response = req.protocol + '://' + req.get('host') + req.baseUrl;
    if (query.length) {
        response += "?";
        response += query.join("&");
    }
    return response;
};

router.get('/', function (req, res) { // GET Method
    var cursor = req.collection.find({});

    var count = 0;

    req.query.page = (req.query.page) ? parseInt(req.query.page) : 1;
    req.query.size = (req.query.size) ? parseInt(req.query.size) : 20;

    var skips = req.query.size * (req.query.page - 1);

    var response = {
        page: req.query.page
    };

    cursor.count(function (error, ct) {
        if (!error) {
            response.pages = Math.ceil(ct / req.query.size);
            response.total = ct;

            if (response.page > 1) {
                response.prev = remakeQuery(req, (response.page - 1));
            }
            if (response.page < response.pages) {
                response.next = remakeQuery(req, (response.page + 1));
            }
        }
    });

    req.collection.find({}) // find all data
        .skip(skips)
        .limit(req.query.size)
        .toArray(function (err, docs) { // convert all data to array
            if (err) {
                debug(util.inspect(err, false, null));
                res.status(500).send(err);
            } else {
                response.itens = docs;
                debug(util.inspect(response, false, null));
                res.json(response);
                res.end();
            }
        });
});

router.post('/', function (req, res) { // POST Method
    req.collection.insert(req.body, {
        safe: true
    }, function (err, docs) { // insert data
        if (err) {
            debug(util.inspect(err, false, null));
            res.status(500).send(err);
        } else {
            debug(util.inspect(docs, false, null));
            res.send(docs);
        }
    });
});

router.get('/:_id', function (req, res) { // GET Method
    req.collection.findOne({
            _id: BSON.ObjectID(req.params._id)
        },
        function (err, docs) { // find a uniq ID
            if (err) {
                debug(util.inspect(err, false, null));
                res.status(500).send(err);
            } else {
                debug(util.inspect(docs, false, null));
                res.send(docs);
            }
        });
});

router.put('/:_id', function (req, res) { // PUT Method 
    req.collection.update( // Update a document in database
        {
            _id: BSON.ObjectID(req.params._id)
        }, {
            $set: req.body
        }, {
            sage: true
        },
        function (err, docs) {
            if (err) {
                debug(util.inspect(err, false, null));
                res.status(500).send(err);
            } else {
                debug(docs);
                res.send(docs);
            }
        });
});

router.delete('/:_id', function (req, res) { // DELETE Method
    req.collection.remove( // remove document
        {
            _id: BSON.ObjectID(req.params._id)
        },
        function (err, docs) {
            if (err) {
                debug(util.inspect(err, false, null));
                res.status(500).send(err);
            } else {
                debug(docs);
                res.send(docs);
            }
        });
});

module.exports = router;