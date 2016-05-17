var express 	= require('express'),
	index 		= require('../lib/auth'),

    jwt 		= require('jsonwebtoken'),					// used to create, sign, and verify tokens - https://www.npmjs.com/package/jsonwebtoken
    mongoose	= require('mongoose'),						// used to access mongo db - https://www.npmjs.com/package/mongoose

    User   		= require('../models/users'); 				// get our mongoose model

var router 		= express.Router();

/**
 * Token Access Only Endpoints
 * http://www.gonegamer.com/auth
 */

// API ROUTES -------------------

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/authenticate', function(req, res) {
	console.log(req.app.get('superSecret'));

  	// find the user
	User.findOne({
	  name: req.body.name
	}, function(err, user) {

		if (err) throw err;

		if (!user) {
			res.json({ success: false, message: 'Authentication failed. User not found.' });
		} else if (user) {

		  // check if password matches
			if (user.password != req.body.password) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });

			} else {

				// if user is found and password is right
				// create a token
				var token = jwt.sign(user, req.app.get('superSecret'), {
					expiresIn: 60*1440 // expires in 60s * 1440 = min 24 hours
				});

				// return the information including token as JSON
				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			}   

		}

	});
});

// route middleware to verify a token
router.use(function(req, res, next) {

	// check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	// decode token
	if (token) {

		// verifies secret and checks exp
		jwt.verify(token, req.app.get('superSecret'), function(err, decoded) {      
		
			if (err) {
		    	return res.json({ success: false, message: 'Failed to authenticate token.' });   

		  	} else {
		    	// if everything is good, save to request for use in other routes
		    	req.decoded = decoded; 
		    	console.log('Token OK');   
		    	next();
		  }

		});

	} else {

		// if there is no token
		// return an error
		return res.status(403).send({ 
		    success: false, 
		    message: 'No token provided.' 
		});
	  
	}
});

// route to show a random message (GET http://localhost:8080/api/)
router.get('/', function(req, res) {
	console.log('Getting API Index');
  	res.status(200).json({ message: 'Welcome to the coolest API on earth!' });
});

// route to return all users (GET http://localhost:8080/api/users)
router.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
}); 

module.exports = router;