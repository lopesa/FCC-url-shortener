'use strict';

var express = require('express');
var mongo = require('mongodb');
var routes = require('./app/routes/index.js');

var app = express();

var dbUrl = {
   local: 'mongodb://localhost:27017/url_shortener',
   mlab: 'mongodb://urlshorten:urlshorten@ds023000.mlab.com:23000/heroku_lj095s37'
};

mongo.connect(dbUrl.mlab, function (err, db) {

   if (err) {
      throw new Error('Database failed to connect!');
   } else {
      console.log('Successfully connected to MongoDB on port 27017.');
   }

   // app.use('/public', express.static(process.cwd() + '/public'));
   app.use('/controllers', express.static(process.cwd() + '/app/controllers'));

   // set port to env port with backup of 5000
   // from example heroku app
   app.set('port', (process.env.PORT || 5000));

   // prettify json responses
   app.set('json spaces', 3);

   routes(app, db);

   app.listen(app.get('port'), function() {
     console.log('Node app is running on port', app.get('port'));
   });

});
