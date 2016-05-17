var express 	= require('express'),
	auth 		= require('../lib/auth'),

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
router
	.get('/', function(req, res) {
	    return res.send('Hello! The API is at http://localhost:' + config.port + '/api');

	})

	.post('/checkUserID', function(req, res) {
		// return res.status(200).set('Content-Type', 'application/json').json({status:"ok", request: req.body});
		auth.checkUserID(req.body.userID, function(result){
			if(result.err) {
				return res.status(206).set('Content-Type', 'application/json').json({status:'error',error:"Error in checking userID.", log: result.log});
			}
			res.status(200).set('Content-Type', 'application/json').json(result);
		});
	})

	.post('/registerUser', function(req, res) {
		// return res.status(200).set('Content-Type', 'application/json').json({status:"ok", user: req.body});
		auth.registerUser(req.body, function(result){
			if(result.err) {
				return res.status(206).set('Content-Type', 'application/json').json({status:'error',error:"Error in registering user.", log: result.log});
			}
			res.status(200).set('Content-Type', 'application/json').json(result);
		});
	})

	.get('/setup', function(req, res) {

		// create a sample user
		var user = new User({ 
			name: 'Ross Boxall', 
			password: 'testPassword',
			admin: true 
		});

		// save the sample user
		user.save(function(err) {
			if (err) throw err;

			console.log('User saved successfully');
			res.json({ success: true });
		});

	})

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