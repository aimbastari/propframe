module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: require('./loaders.config')
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
