var express 	= require('express'),
	index 		= require('../lib/auth'),

    jwt 		= require('jsonwebtoken'),                    // used to create, sign, and verify tokens
    mongoose	= require('mongoose'),						// used to access mongo db

    User   		= require('../models/users'); // get our mongoose model

var router = express.Router();

/**
 * Authentication Endpoints
 * http://www.gonegamer.com/auth
 */

/**
 * Pages
 */

/* GET home page. */
router.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + config.port + '/api');
});

router.get('/setup', function(req, res) {

	// create a sample user
	var ross = new User({ 
		name: 'Ross Boxall', 
		password: 'testPassword',
		admin: true 
	});

	// save the sample user
	ross.save(function(err) {
		if (err) throw err;

		console.log('User saved successfully');
		res.json({ success: true });
	});

});

router
	.all('/register', function(req, res) {
		var userid 		= req.body.userid 		? req.body.userid 		: req.query.userid,
			playerName 	= req.body.playerName 	? req.body.playerName 	: req.query.playerName,
			password 	= req.body.password 	? req.body.password 	: req.query.password,
			email 		= req.body.email 		? req.body.email 		: req.query.email;

		console.log(['inputs',{playerName: playerName, password: password, email: email}]);

		var user = new User({
			userid: 	userid,
			playerName: playerName,
			password: 	password,
			email: 		email
		});

		// console.log(['user model:', user]);
		// return res.json({success: true, user_model: user});

		user.save(function(err){
			if (err) throw err;
			
			console.log(['user model:', user]);
			return res.json({success: true, user_model: user});
		});

	});

module.exports = router;