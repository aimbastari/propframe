//Contains configuration for production env
exports = {
  //enable logging for development
  logging: false,
  seed: false,
  db: {
    url: 'mongodb://prodserver/propframe'
  }
};
