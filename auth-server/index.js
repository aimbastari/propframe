//Main starting point
const express = require('express');
const http = require('http');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const router = require('./router');
const app = express();

//DB setup
mongoose.connect('mongodb://localhost:auth');

//App setup
app.use(morgan('combined'));
app.use(bodyparser.json({type : '*/*'}));
router(app);

//Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
console.log('Server Listening on:', port);
server.listen(port);
