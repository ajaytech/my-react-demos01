var path = require('path');
var webpack = require('webpack');
var env = process.env.NODE_ENV;

var plugins = [];
if (env !=='production') {
  plugins = plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ])
}

if (env === 'production') {
  plugins = plugins.concat([
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ])
}
module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    'app': (env==='production') ?  './JS/index.js':  ['webpack-hot-middleware/client', './JS/index.js']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/dist/'
  },
  plugins: plugins,
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
    }]
  }
};
