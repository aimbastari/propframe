const User = require('../models/user');
const config = require('../config');



//Case where user does initial sign up
exports.getProfile = function(req, res, next){
  const user = req.body.user;

  if(!user){
    return res.status(422).send({error : 'Error retrieving profile'});
  }

  res.json({user : user});

}


exports.saveProfile = function(req, res, next){
  const user = req.user;
  const query = {_id : user._id};

  User.findOneAndUpdate(query,
    { $set: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
     }
    },
    {new : true}, function(err, doc){
      if (err) {return next(err);}

      if(!doc){
        return res.status(422).send({error : 'Error retrieving profile'});
      }

    res.json({user : doc});

  });


}
