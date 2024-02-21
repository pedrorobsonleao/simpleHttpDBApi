/* jshint esversion:8 */

const mysql = require('mysql');
const { ConnectionString } = require('connection-string');

const state = { db: null };

exports.connect = (url, done) => {

    if (state.db) return done();

    const obj = new ConnectionString(url);

    obj.database = obj.path[0];

    const db = mysql.createConnection(obj);

    db.connect(err => {
        if (err) return done(err);
        state.db = db;
        done();
    });
};

exports.get = () => state.db

exports.close = (done) => {
    if (state.db) {
        state.db.close((err, result) => {
            state.db = null;
            state.model = null;
            done(err);
        });
    }
};