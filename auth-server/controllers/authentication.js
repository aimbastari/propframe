const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');


function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}

//User has already authorized email password
exports.signin = function(req, res, next){
  res.send({token: tokenForUser(req.user)});

}

//Case where user does initial sign up
exports.signup = function(req, res, next){
  const email = req.body.email;
  const password = req.body.password;

  if(!email || !password){
    return res.status(422).send({error : 'Provide email and password'});
  }

  //see if user exists
  User.findOne({ email : email }, function(err, existingUser){
    if (err) {return next(err);}

    if(existingUser) {
      return res.status(422).send({error : 'Email is laready in use!'});
    }

    //if user does NOT exist then create and save user record
    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err){
      if (err) {return next(err);}

      //Respond indicating user was created
      res.json({token : tokenForUser(user)});
    });

  });

}
