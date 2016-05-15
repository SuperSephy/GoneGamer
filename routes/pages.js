var express 	= require('express'),
	index 		= require('../lib/index');

var router = express.Router();

/**
 * Index Endpoints
 * http://www.gonegamer.com/
 */

/**
 * Pages
 */

/* GET home page. */
router.get('/', function(req, res, next) {
	index.index(req, function(data){
		res.render('goneGamer/index', {layout: 'layouts/default', title:'Gone Gamer Home', pageName: 'index', data: data, things: "test"});
	});
});

module.exports = router;