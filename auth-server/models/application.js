const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define the Application model
const applicationSchema = new Schema({
  userId :  mongoose.Schema.Types.ObjectId,
  lastName : String,
  firstName : String,
  middleName : String,
  ssn : String,
  otherId : String,
  dateOfBirth :  { type : Date, default : Date.now},
  aliases : {type: Array, "default" : []},
  email : String,
  phones : {type: Array, "default" : []},
  driversLicense : {
      "number" : String,
      "expiration" : { type : Date, default : Date.now},
      "state" : String
  },
  name : String,
  status: String,
  addresses : {type: Array, "default" : []},
  employments : {type: Array, "default" : []},
  occupants : {type: Array, "default" : []},
  pets : {type: Array, "default" : []},
  liquidFurniture : String,
  memberArmedForces : Boolean,
  grossIncome : Number,
  paymentInterval : String,
  bankAccounts : {type: Array, "default" : []},
  creditors : {type: Array, "default" : []},
  emergencyContacts : {type: Array, "default" : []},
  personalReferences : {type: Array, "default" : []},
  autos : {type: Array, "default" : []},
  bankruptcies : Boolean,
  evictions : Boolean,
  drugConvictions : Boolean,
  medicalMarijuana : Boolean,
  smoke : Boolean,
  createDate : { type : Date, default : Date.now},
  signDate : { type : Date, default : Date.now},
  signature : String
});


//Create the model className
const ModelClass = mongoose.model('application', applicationSchema);

//Export the model
module.exports = ModelClass;
