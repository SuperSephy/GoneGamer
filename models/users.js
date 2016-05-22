// get an instance of mongoose and mongoose.Schema
var mongoose 			= require('mongoose'),							// Mongo ORM
	moment 				= require('moment'),							// Date/Time manipulation
    log 				= require('debug')('goneGamer:model:users'),	// Log to console with details
	bcrypt 				= require('bcrypt'),							// Password hash
    SALT                = 10,											// How many times password is salted
    MAX_LOGIN_ATTEMPTS  = 5,
    LOCK_TIME           = 1,
    LOCK_INTERVAL 		= 'hour';

var Schema 				= mongoose.Schema;

// set up a mongoose model (passed in module.exports)
var UserSchema 			= new Schema({ 
	userID: 		{ type: String, 	required: true, trim: true, index: { unique: true } },
    playerName: 	{ type: String, 	required: true, trim: true }, 
    password: 		{ type: String, 	required: true }, 
    email: 			{ type: String, 	required: true },

    lastLogin: 		{ type: Date, 		default: Date.now},
    loginAttempts: 	{ type: Number, 	default: 0 },
    lockUntil: 				Date,

    inactive: 		{ type: Boolean, 	default: false},

    admin: 			{ type: Boolean, 	default: false} 
}, {
	timestamps: true
});


UserSchema.virtual('isLocked').get(function() {
    // check for a future lockUntil timestamp
    return !!(this.lockUntil && this.lockUntil > moment().toDate() );
});

// Ensure Passwords are salted before saving
UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

// Compare submitted password to saved password
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// Increment the login attempts if password doesn't match - mitigates brute force attacks
UserSchema.methods.incLoginAttempts = function(cb) {
    // if we have a previous lock that has expired, restart at 1
    if (this.lockUntil && this.lockUntil < moment().toDate()) {
        return this.update({
            $set: { loginAttempts: 1 },
            $unset: { lockUntil: 1 }
        }, cb);
    }
    // otherwise we're incrementing
    var updates = { $inc: { loginAttempts: 1 } };
    // lock the account if we've reached max attempts and it's not locked already
    if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
        updates.$set = { lockUntil: moment().add(LOCK_TIME, LOCK_INTERVAL).toDate() };
    }
    return this.update(updates, cb);
};

// expose enum on the model, and provide an internal convenience reference 
var reasons = UserSchema.statics.failedLogin = {
    NOT_FOUND: 0,
    PASSWORD_INCORRECT: 1,
    MAX_ATTEMPTS: 2
};


/**
 * Tests a userID and password for validity, if fails, increments a login count
 * @param  {String} 	userID 		String of the userID to test
 * @param  {String} 	password 		String of unsalted password to test
 * @param  {Function} 	cb 				Callback function
 * @return {Object}               		{err, user, if user not found/pw mismath/or locked - give reason}
 */
UserSchema.static('getAuthenticated', function (userID, password, cb) {
	// log('getAuthenticated called. Looking for: '+userID);

    this.findOne({ userID: userID }, function(err, user) {
        if (err) return cb(err);

        // make sure the user exists
        if (!user) {
            return cb(null, null, reasons.NOT_FOUND);
        }

        // check if the account is currently locked
        if (user.isLocked) {
            // just increment login attempts if account is already locked
            return user.incLoginAttempts(function(err) {
                if (err) return cb(err);
                return cb(null, null, reasons.MAX_ATTEMPTS, user.lockUntil);
            });
        }

        // test for a matching password
        user.comparePassword(password, function(err, isMatch) {
            if (err) return cb(err);

            // check if the password was a match
            if (isMatch) {
                // if there's no lock or failed attempts, just return the user
                // if (!user.loginAttempts && !user.lockUntil) return cb(null, user);
                
                // reset attempts and lock info - update last login date.
                var updates = {
                    $set: { loginAttempts: 0, lastLogin: moment().toDate() },
                    $unset: { lockUntil: 1 }
                };
                return user.update(updates, function(err) {
                    if (err) return cb(err);
                    return cb(null, user);
                });
            }

            // password is incorrect, so increment login attempts before responding
            user.incLoginAttempts(function(err) {
                if (err) return cb(err);
                return cb(null, null, reasons.PASSWORD_INCORRECT, Math.max(MAX_LOGIN_ATTEMPTS - (user.loginAttempts + 1), 0));
            });
        });
    });
});

// Unlock an array users by their mongo_ids
UserSchema.static('unlock_ids', function(_ids, cb) {
    this.update({ _id: {$in: _ids} }, { $set: {loginAttempts: 0}, $unset: {lockUntil: 1} }, function(err, result){
        if (err) return cb(err);
        return cb(null, result);
    });
});

// Unlock an array users by their mongo_ids
UserSchema.static('delete_ids', function(_ids, cb) {
    this.remove({ _id: {$in: _ids} }, function(err, result){
        if (err) return cb(err);
        return cb(null, result);
    });
});

module.exports = mongoose.model('User', UserSchema);