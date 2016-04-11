'use strict';

function urlService (db) {

  var urls = db.collection('urls');

  this.createUrl = function (req, res) {
		
		var inputUrl = req.params[0],
			urlSyntaxTest = /https?:\/\/www\.\w+\.(com|net|org|co)/,
			finalUrlConversion = {},
			returnObj = {},
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

			urls.insertOne(finalUrlConversion, function(err, result) {
				if (err) {
	        throw err;
	      }
	      else {
	      	// build the reply object and send it back
	      	returnObj.originalUrl = finalUrlConversion.originalUrl;
	      	returnObj.shortUrl = finalUrlConversion.shortUrl
					
					res.send(returnObj);
	      }
			});
		}

		else {
	  	res.send('bad url')
  	}
  }

  this.getUrl = function(req, res) {
		var inputUrl = req.params.shortUrl;
  	
  	res.send(inputUrl)
  }
}

module.exports = urlService;


