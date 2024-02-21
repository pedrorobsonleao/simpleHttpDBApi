/* jshint esversion: 8 */

// var exports = module.exports = {};

// Port to http server bind
exports.DEFAULT_PORT = 8080;
exports.PORT = process.env.PORT;

// Database
exports.DB = {
    uri: process.env.DB_URI
};

// URL Bind
exports.URL = [
    // {uri: '/crud', module: '../modules/mongocrud'},
    // {uri: '/crud2', module: '../modules/mongocrud'}
    {uri: '/cars', module: '../modules/mysqlcrud' }
];

// Static html bases
exports.HTDOCS = [
    {uri: '/', dir:'../../www'}
];

// enable cross site
exports.hasCORS = true;