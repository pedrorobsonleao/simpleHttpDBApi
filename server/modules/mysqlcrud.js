/* jshint esversion:8 */

const util = require('util'); // Used to Inspect objects
const express = require('express'); // Used to make a express module
const db = require('../lib/mysql'); // A database pool link

const router = express.Router();
const debug = require('debug')('crud'); //debug - to use set im prompt: DEBUG=crud node ./bin/wwww

router.use((req, res, next) => {
    // get collection name from url request
    let name = req.originalUrl.replace(/^\/(\w+).*/, '$1'); // get the first name in request url to make a collection

    debug('get connection:' + name);
    req.db = db.get(); // db connection
    debug(util.inspect(req.body, false, null));
    next(); // go to next event
});


const _selectQuery = `
SELECT 
    vehicle.id,
    vehicle.license,
    vehicle.model,
    vehicle.price,
    vehicle.color,
    vehicle.manufact_year,
    vehicle.model_year,
    vehicle.km,
    vehicle.optional,
    vehicle.status,
    vehicle.created_dt,
    brand.name brand_name,
    fuel.type fuel_type
    FROM   vehicle vehicle
    JOIN   fuel  fuel  ON fuel.id  = vehicle.fuel_id
    JOIN   brand brand ON brand.id = vehicle.brand_id
    WHERE  1=1
`;

const _selectCount = 'SELECT count(1) total from vehicle';

const remakeQuery = (req, page) => {
    let query = [];
    for (let key in req.query) {
        let value = req.query[key];
        if (key === "page" && page) {
            value = page;
        }
        query.push(key + "=" + value);
    }

    let response = req.protocol + '://' + req.get('host') + req.baseUrl;
    if (query.length) {
        response += "?";
        response += query.join("&");
    }
    return response;
};

router.get('/:license', (req, res) => {
    req.db.query(`
${_selectQuery}
AND    vehicle.license = '${req.params.license.toUpperCase()}'
    `, (err, rows, fields) => {
        // find vehicle by license

        if (err) {
            debug(util.inspect(err, false, null));
            res.status(500).send(err);
        } else {
            debug(util.inspect(rows, false, null));
            if (rows.length === 0) res.status(404).send(rows)
            else res.send(rows[0]);
        }
    });
});

router.get('/', (req, res) => {

    req.query.page = (req.query.page) ? parseInt(req.query.page) : 1;
    req.query.size = (req.query.size) ? parseInt(req.query.size) : 20;

    let skips = req.query.size * (req.query.page - 1);

    let response = {
        page: req.query.page
    };

    req.db.query(_selectCount,
        (err, rows, fields) => {
            // count fields

            const qtd = rows[0].total;
            
            if (err) res.status(500).send(err);

            response.pages = Math.ceil(qtd / req.query.size);
            response.total = qtd;

            if (response.page > 1) {
                response.prev = remakeQuery(req, (response.page - 1));
            }
            if (response.page < response.pages) {
                response.next = remakeQuery(req, (response.page + 1));
            }

            req.db.query(`
            ${_selectQuery}
            order  by id
            limit  ${req.query.size}
            offset ${skips}
                `, (err, rows, fields) => {
                // find vehicle by license

                if (err) {
                    debug(util.inspect(err, false, null));
                    res.status(500).send(err);
                } else {
                    debug(util.inspect(rows, false, null));
                    response.itens = rows;
                    if (rows.length === 0) res.status(404).send(response)
                    else res.send(response);
                }
            });
        });

});


module.exports = router;