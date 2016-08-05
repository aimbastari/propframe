//Constant definitions
const NODE_PORT = process.env.NODE_PORT || 3090;
const DB_SERVER = process.env.DB_SERVER || "localhost";
const DB_PORT = process.env.DB_PORT || 27017;
const NODE_ENV = process.env.NODE_ENV || 'dev';

//Load mongo orm and Schema
const mongoose = require('mongoose');
const User = require('../models/user');
const Application = require('../models/application');


//Load data
const userData = require('./user_data.js').data;
const applicationData = require('./application_data.js').data;

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


//Seed data: first remove exisiting users, then create users
Application.remove({}, function(err){
  if(err) return console.error(err);
  console.log("Applications removed");

  Application.create(applicationData, function (err, doc){
    if(err) return console.error(err);

    console.log("Inserted Applications");
    console.log(doc);

    //Populate UerId - ObjectId
    User.findOne({email : "tenant@gmail.com"}, function(err, doc){
      if(err) return console.error(err);

      if(doc){
        console.log("Found one user");

        Application.findOneAndUpdate({},
          { $set: {userId: doc._id}},{new : true}, function(err, doc){
            if (err) {return next(err);}

            if(!doc){
              console.log("Cannot update application");
            }

        });

      }
    });

  });

});
