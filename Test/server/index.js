var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('../../webpack.config');
var app = express();

if (process.env.NODE_ENV !== 'production') {
  var compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.use('/static', express.static(path.join(__dirname, '..', 'client')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

app.listen(8080, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:8081');
});
