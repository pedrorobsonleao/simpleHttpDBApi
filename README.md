# simpleHttpServerMongoCrudJs
Simple Http Server and MongoDB Rest Crud - Node.js

# <a name='home'></a>glossário
* [resume](#resume)
* [run](#run)
* [services](#services)
    * [create](#create)
    * [read](#read)
    * [update](#update)
    * [delete](#delete)
```
$ tree
.
├── LICENSE                       # A GPL 3.0 License
├── README.md                     # This File
├── package.json
└── server
    ├── bin
    │   └── httpd                 # httpd server starter
    ├── etc
    │   └── config.js             # a configuration file
    ├── lib
    │   ├── mongo.js              # mongodb pool implementation
    │   ├── server.js             # server library implementation
    │   └── string.js             # aux string normalize library 
    └── modules
        └── mongocrud.js          # CRUD implementation to mongodb

5 directories, 9 files
```

The code is a **HTTPD** configurable server sample with a **CRUD** **MongoDB** api **REST** implemented.

Use this code to learning about **NodeJs**, **HTTP** server, **MongoDB**, **RestFul** api services.
# <a name='resume'></a>[resume](#home)
This code is write to run in [***HEROKU***](https://www.heroku.com/) environment.

To run in your machine or [***c9.io***](https://c9.io) change the file [**config.js**](./server/etc/config.js) or set the variables:
```
$ export MONGODB_URI=mongodb://localhost:27017/test
$ export PORT=9090
```
# <a name='run'></a>[run](#home)
```
$ npm install
$ npm start
```
# <a name='services'></a>[services](#home)
## <a name='create'></a>[create](#home) - (method POST)
```
/collection
```
### sample
```
$ curl -X POST -d server=httpd -d db=mongodb http://localhost:9090/crud1
```
Save in database a document posted in *BODY*.

## <a name='read'></a>[read](#home) - (method GET)
```
/collection
```
### sample
```
$ curl -X GET http://localhost:9090/crud
```
Read a object from database.
```
/collection/:_id
```
### sample
```
$ curl -X GET http://localhost:9090/crud1/59471588594c2159d047661f
```
Read a one object from database by ID.
## <a name='update'></a>[update](#home) - (method PUT)
```
/collection/:_id
```
### sample
```
$ curl -X PUT -d api=rest http://localhost:9090/crud1/59471588594c2159d047661f
```
Update a object in database.
## <a name='delete'></a>[delete](#home) - (method DELETE)
```
/collection/:_id
```
### sample
```
$ curl -X DELETE http://localhost:9090/crud1/59471588594c2159d047661
```
Delete a object from database.