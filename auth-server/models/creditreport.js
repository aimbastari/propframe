const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

//Define the User model
const creditReportSchema = new Schema({
  _id: ObjectId,
  score: Number,
  entity: String,
  date: {type: Date, default: Date.now}
});


//Create the model className
const ModelClass = mongoose.model('creditreport', creditReportSchema);

//Export the model
module.exports = ModelClass;
