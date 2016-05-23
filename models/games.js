// get an instance of mongoose and mongoose.Schema
var mongoose 			= require('mongoose'),							// Mongo ORM
    log 				= require('debug')('goneGamer:model:games');	// Log to console with details

var Schema 				= mongoose.Schema;

// set up a mongoose model (passed in module.exports)
var gameSchema 			= new Schema({ 
	name: 			{ type: String, 	required: true, trim: true, index: { unique: true } },
    gameMasters: 		   [String], 									// Array of Strings
    
    template: 		{ type: String, 	required: true } 				// Which starting template to use for new Characters
}, {
	timestamps: true
});

module.exports = mongoose.model('Game', gameSchema);