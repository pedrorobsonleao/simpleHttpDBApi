# MongoCrudJs
A Simple MongoDb RestFul CRUD with NodeJs

```
$ tree
.
├── LICENSE                       # A GPL 3.0 License
├── README.md                     # This File
├── bin
│   └── www                       # The file to start a http server
├── package.json                  # A dependence descriptor
└── srv
    ├── db
    │   └── mongo.js              # A database pool implementation
    ├── routers
    │   └── mongocrud.js          # The CRUD services implementation
    └── server.js                 # The server implementation

4 directories, 7 files
```

This code is a sample **CRUD**, restful MongoDB implementation.

Use this code to learning about **NodeJs**, **MongoDB**, **RestFull** api services.

* **to run**

```$ npm install```

```$ npm start```
* **service**

**POST** - create

```/collection```

Save in database a document posted in *BODY*.

**GET**

```/collection```

Read a object from database.

```/collection/:_id```

Read a one object from database by ID.

**PUT**

```/collection/:_id```

Update a object in database.

**DELETE**

```/collection/:_id```

Delete a object from database.

* **extra**

To run this application in your machine or http://c9.io you need set the variables:

**MONGODB_URI** = http://localhost:27017/database

**PORT** = 8080

In code was many comments to guide your development.

Attents to:

***srv/server.js***
```javascript
24: // a url router ...
25: app.use('/sample_crud1', require('../srv/routers/mongocrud'));
26: app.use('/sample_crud2', require('../srv/routers/mongocrud'));
```
***srv/routers/mongocrud.js***

Is very important read the documentation for all ***requires*** in code.