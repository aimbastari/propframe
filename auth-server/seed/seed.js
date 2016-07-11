//Constant definitions
const NODE_PORT = process.env.NODE_PORT || 3090;
const DB_SERVER = process.env.DB_SERVER || "localhost";
const DB_PORT = process.env.DB_PORT || 27017;
const NODE_ENV = process.env.NODE_ENV || 'dev';

//Load mongo orm and User Schema
const mongoose = require('mongoose');
const User = require('../models/user');

//Load user data
const userData = require('./user_data.js').data;

//DB setup
const DB_URL=`mongodb://${DB_SERVER}:${DB_PORT}/auth`;
mongoose.connect(DB_URL);

//Seed data: first remove exisiting users, then create users
User.remove({}, function(err){
  if(err) return console.error(err);
  console.log("Users removed");

  User.create(userData, function (err, users){
    if(err) return console.error(err);

    console.log("Inserted Users");
    console.log(users);

  });

});
