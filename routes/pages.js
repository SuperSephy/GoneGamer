var express 	= require('express'),
    parseurl 	= require('parseurl'),			// used in the view tracking
	index 		= require('../lib/index');		// server logic

var router = express.Router();

/**
 * Index Endpoints
 * http://www.gonegamer.com/
 */

// View Tracking middleware
router.use(function (req, res, next) {
	var views = req.session.views
	if (!views) {views = req.session.views = {} }

	// get the url pathname 
	var pathname = parseurl(req).pathname

	// count the views 
	views[pathname] = (views[pathname] || 0) + 1
	next()
});

/**
 * Pages
 */

/* GET home page. */
router.get('/', function(req, res, next) {
	index.index(req, function(data, err){
		if (err) throw err;

		res.render('goneGamer/index', {layout: 'layouts/default', title:'Gone Gamer Home', pageName: 'index', data: data, things: "test"});
	});
});

module.exports = router;