'use strict';

var UrlService = require(process.cwd() + '/app/controllers/urlService.server.js');

module.exports = function (app, db) {
	
	var urlService = new UrlService(db);

	app.route('/')
		.get(function (req, res) {
         res.sendFile(process.cwd() + '/public/index.html');
      });

	app.route('/new/*').get(urlService.createUrl);

	app.route('/:shortUrl').get(urlService.getUrl);

};
