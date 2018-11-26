var exports = module.exports = {};

// Port to http server bind
exports.PORT = process.env.PORT;

// Database
exports.DB = {
    uri: process.env.MONGODB_URI,
    module: '../lib/mongo'
};

// URL Bind
exports.URL = [
    {uri: '/reviews', module: '../modules/mongocrud'},
    {uri: '/crud2', module: '../modules/mongocrud'}
];

// Static html bases
exports.HTDOCS = [
    {uri: '/', dir:'../../www'}
];

// enable cross site
exports.hasCORS = true;