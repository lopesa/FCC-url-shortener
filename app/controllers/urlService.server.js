'use strict';

function urlService (db) {

  var urls = db.collection('urls');

  this.createUrl = function (req, res) {
		
		var inputUrl = req.params[0],
			urlSyntaxTest = /^https?:\/\/www\.\w+\.(com|net|org|co)(:\d{1,5})?$/,
			finalUrlConversion = {},
			randomNumber;

		randomNumber = function randomNumber () {
			var newRandomNumber = Math.floor(Math.random() * 10000);

			// check if number is being used
			// if it is, try another one.
			urls.findOne({ 'shortUrl': newRandomNumber }, function (err, result) {
	      if (err) {
	        throw err;
	      }
	      else {
	      	if (result !== null) {
	      		randomNumber()
	      	}
	      }
			});

			return newRandomNumber
		}

		// if it passes the url syntax test
		if (urlSyntaxTest.test(inputUrl)) {

			// build the object and insert into db
			finalUrlConversion.originalUrl = inputUrl;
			finalUrlConversion.shortUrl = randomNumber();

			urls.insertOne(finalUrlConversion, {forceServerObjectId: true}, function(err, result) {
				if (err) {
	        throw err;
	      }
	      else {
					res.send(finalUrlConversion);
	      }
			});
		}

		else {
	  	res.send('not a valid url for this service')
  	}
  }

  this.getUrl = function(req, res) {
		var inputUrl = Number(req.params.shortUrl),
			search = { shortUrl: inputUrl };

		urls.find(search).limit(1).next(function(err, result){
			if (err) {
        throw err;
      }
      else if (!result) {
      	res.send('invalid short url')
      }
      else {
      	res.redirect(result.originalUrl);
      }
		})
  }
}

module.exports = urlService;


