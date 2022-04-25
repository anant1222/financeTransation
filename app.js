const express = require('express');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var router = require('./routes/index');
var addRequestId = require('express-request-id')();
var useragent = require('express-useragent');
const http = require('http');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const db_config = require(path.join(__dirname, 'config/dbconfig'))[env];
global.NODE_PATH = db_config.NODE_MODULES_PATH;
var app = express();
app.use(addRequestId);
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.get('/', function (req, res) {
    res.send({
        greet:'Working Now!'
    });
})
router(app);
app.use(useragent.express());
app.listen(3030,()=>{console.log(`Server started in http://localhost:3030`)})

module.exports = app;
