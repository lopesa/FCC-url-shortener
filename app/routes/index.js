'use strict';

var UrlService = require(process.cwd() + '/app/controllers/urlService.server.js');

module.exports = function (app, db) {
	var urlService = new UrlService(db);

	app.route('/:shortUrl').get(urlService.getUrl);

	app.route('/new/*').get(urlService.createUrl);
};
