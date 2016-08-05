//Constant definitions
const NODE_PORT = process.env.NODE_PORT || 3090;
const DB_SERVER = process.env.DB_SERVER || "localhost";
const DB_PORT = process.env.DB_PORT || 27017;
const NODE_ENV = process.env.NODE_ENV || 'dev';

//Main starting point
const express = require('express');
const http = require('http');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const router = require('./router');
const cors = require('cors');

const app = express();

//DB setup
const DB_URL=`mongodb://${DB_SERVER}:${DB_PORT}/auth`;
mongoose.connect(DB_URL);

//App setup
app.use(cors());
app.use(morgan('combined'));
app.use(bodyparser.json({type : '*/*'}));
router(app);

//Server setup
const server = http.createServer(app);
console.log('Server Listening on:', NODE_PORT);
console.log('Running in Mode: ', NODE_ENV);
server.listen(NODE_PORT);
