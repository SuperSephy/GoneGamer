var env 		= process.env.NODE_ENV,
	express 	= require('express'),

    mongoose	= require('mongoose'),						// used to access mongo db - https://www.npmjs.com/package/mongoose
    User   		= require('../models/users'), 				// get our mongoose model

    jwt 		= require('jsonwebtoken');					// used to create, sign, and verify tokens - https://www.npmjs.com/package/jsonwebtoken


var router 		= express.Router();

router
	.get('/getUsers', function(req, res){
		User.find({}, function(err, docs) {
			return res.render('goneGamer/admin/getUsers', {layout: 'layouts/default', app: 'admin', title:'Gone Gamer Home', projectName: 'goneGamer', users: docs});
		});
	})

	/**
	 * Unlocks an array of users
	 * @param 	{Array} 	req.body.ids 	["mongoHashString", "mongoHashString2"]
	 */
	.post('/unlockUsers', function(req, res){
		User.unlock_ids(req.body.ids, function(err, results){
			if (err) return res.json({status: 'err', err: err});
			return res.json({status: 'ok', results: results});
		});
	})

	/**
	 * Deletes an array of users
	 * @param 	{Array} 	req.body.ids 	["mongoHashString", "mongoHashString2"]
	 */
	.post('/deleteUsers', function(req, res){
		User.delete_ids(req.body.ids, function(err, results){
			if (err) return res.json({status: 'err', err: err});
			return res.json({status: 'ok', results: results});
		});
	});

module.exports = router;