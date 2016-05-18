var express 	= require('express'),
	auth 		= require('../lib/auth'),

    jwt 		= require('jsonwebtoken'),                    // used to create, sign, and verify tokens
    mongoose	= require('mongoose'),						// used to access mongo db

    User   		= require('../models/users'); // get our mongoose model

var router = express.Router();

/**
 * Authentication Endpoints
 * http://www.gonegamer.com/auth
 * 								/checkUserID
 * 								/register
 * 								/login
 */

router
	// Checks if userID is available - req.body = {userID: string}
	.post('/checkUserID', function(req, res) {
		// return res.status(200).set('Content-Type', 'application/json').json({status:"ok", request: req.body});
		auth.checkUserID(req.body.userID, function(result){
			if(result.err) {
				return res.status(206).set('Content-Type', 'application/json').json({status:'error',error:"Error in checking userID.", log: result.log, err: err});
			}
			res.status(200).set('Content-Type', 'application/json').json(result);
		});
	})

	// Registers a new user - req.body = {email: string, password: string, playerName: string, userID: string}
	.post('/register', function(req, res) {
		// return res.status(200).set('Content-Type', 'application/json').json({status:"ok", user: req.body});
		auth.registerUser(req.body, function(result){
			if(result.err) {
				return res.status(206).set('Content-Type', 'application/json').json({status:'error',error:"Error in registering user: ", log: result.log, err: err});
			}
			res.status(200).set('Content-Type', 'application/json').json(result);
		});
	})

	// verifies login information - req.body = {userID: string, password: string}
	.post('/login', function(req, res) {
		// return res.status(200).set('Content-Type', 'application/json').json({status:"ok", user: req.body});
		auth.login(req.body, function(result){
			if (result.err) 	return res.status(206).set('Content-Type', 'application/json').json({status:'error', error: result.err});
			if (result.err_no)	return res.status(206).set('Content-Type', 'application/json').json({status:'error', err_no: result.err_no, addl_info: result.addl_info});
			
			res.status(200).set('Content-Type', 'application/json').json(result);
		});
	});

module.exports = router;