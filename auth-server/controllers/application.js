const Application = require('../models/application');

const mongoose = require('mongoose');

//get applications
exports.getApplications = function(req, res){
  const userId = req.user._id;

  Application.find({userId}, 'name createDate status', function(err, docs){
    if(err){
      console.log(err);
      return res.status(422).send({error : "unable to retrieve applications"});
    }

    res.json(docs);

  });

}

//get applications
exports.getApplication = function(req, res){
  const _id = req.params.applicationId;

  Application.findOne({_id}, function(err, doc){
    if(err){
      console.log(err);
      return res.status(422).send({error : "unable to retrieve application"});
    }

    res.json(doc);

  });

}

exports.saveApplication = function(req, res){
  const _id = req.params.applicationId;

  Application.findOneAndUpdate(
    {_id},
    req.body,
    {new : true},
    function(err, doc){
      if (err) {return next(err);}

      if(!doc){
        return res.status(422).send({error : 'Error saving   application'});
      }

    res.json({application : doc});

  });
}

exports.deleteApplication = function(req, res){
  const _id = req.params.applicationId;


  Application.remove({_id}, function(err){
    if (err) {return next(err);}

    //Delete worked. Return the exisitng applications for given user
    const userId = req.user._id;
    Application.find({userId}, {}, function(err, docs){
      if(err) {return next(err);}

      res.status(200).json(docs);

    });

  });
}

exports.createApplication = function(req, res){
  const applicationData = req.applicationData;

  //Add the user id
  const userId = req.userId;
  applicationData.userId = userId;

  Application.create(applicationData, function (err,doc){
    if(err) return console.error(err);

    console.log("Created new Application");
    console.log(doc);

  });
}

exports.createNewApplication = function(req, res){
  const applicationData = req.applicationData;

  //Add the user id
  const userId = req.userId;
  applicationData.userId = userId;

  Application.create(applicationData, function (err,doc){
    if(err) return console.error(err);

    console.log("Created new Application");
    console.log(doc);

  });
}


exports.copyApplication = function(req, res){
  const _id = req.params.applicationId;

  Application.findById(_id).exec(
      function(err, doc) {
          doc._id = mongoose.Types.ObjectId();
          doc.isNew = true;
          doc.name = "copy of" + doc.name;
          doc.save(function(err, doc){
            if(err) {console.log(err); return res.status(201);}

            //Save worked. Return the exisitng applications for given user
            const userId = req.user._id;
            Application.find({userId}, {}, function(err, docs){
              if(err) {return next(err);}

              res.status(200).json(docs);

            });



            res.status("201");
          });
      }
  );

}
