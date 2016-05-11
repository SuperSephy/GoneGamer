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

module.exports = router;