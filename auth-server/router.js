const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session : false});
const requireSignin = passport.authenticate('local', {session : false});

const Profile = require('./controllers/profile');
const Application = require('./controllers/application');


module.exports = function(app){
  app.post('/signup', Authentication.signup);
  app.post('/signin', requireSignin, Authentication.signin);

  //This route is protected and need a JWT token
  app.get('/', requireAuth, function(req, res){
    res.send({message: 'Super Secret Message'});
  });

  //User edit profile routes


  //This route is protected and need a JWT token
  app.get('/creditreports', requireAuth, function(req, res){
    res.send({message: 'Super Secret Message'});
  });

  //This route is protected and need a JWT token
  app.get('/profile', requireAuth, function(req, res){
    res.send({user: req.user});
  });

  //This route is protected and need a JWT token
  app.post('/profile', requireAuth, Profile.saveProfile);


  //Application routes
  //This route is protected and need a JWT token
  app.get('/applications', requireAuth, Application.getApplications);

  //Get single application using param passed in
  app.get('/applications/:applicationId', requireAuth, Application.getApplication);

//Save single application
  app.post('/applications/:applicationId', requireAuth, Application.saveApplication);

  app.post('/applications', requireAuth, Application.createApplication);

  app.post('/applications/copy/:applicationId', requireAuth, Application.copyApplication);

  app.delete('/applications/:applicationId', requireAuth, Application.deleteApplication);




}
