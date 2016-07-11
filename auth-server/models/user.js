const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//Define the User model
const userSchema = new Schema({
  email: {type : String, unique : true, lowercase : true },
  password: String,
  firstName: String,
  lastName: String,
  middleName: String,
  roles: [String],
  address: [String],
  phones: {type: Array, "default": []}
});

//Called before a save operation on a User.
//Encrypts the password using bcrypt
userSchema.pre('save', function (next) {
  //get access to the user model
  const user = this;

  //get salt and run callback
  bcrypt.genSalt(10, function(err, salt){
    if(err){ return next(err);}

    //hash (encyot our password using the salt)
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if(err){return next(err);}

      user.password = hash;

      next();
    });
  });
});

//add the comparePassword method to the user prototype
//bcrypt encrypts the new password and compares it to the stored encrypted one.
//There is no 'decryption of passwords'
userSchema.methods.comparePassword = function(candidatePassword, callback){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if(err){return callback(err);}

    callback(null, isMatch);
  });
}

//Create the model className
const ModelClass = mongoose.model('user', userSchema);

//Export the model
module.exports = ModelClass;
