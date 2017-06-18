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
    {uri: '/crud1',      module: '../modules/regatta'},
    {uri: '/crud2',     module: '../modules/regatta'},
];

// Static html bases
exports.HTDOCS = [
    {uri: '/', dir:'../../www'}
];

// enable cross site
exports.hasCORS = false;