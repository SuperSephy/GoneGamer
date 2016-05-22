angular
	.module('sharedResources')

	.service('globalServices', function ($http) {

        return {

            // Used by CampaignsCtrl to update $scope.campaigns for the table and pagination
            logr: function(message, referrer) {
            	var ref = referrer ? referrer : 'Unknown';
            	return console.log([ref + ': ', message]);
            }

        }; // End returned values

    }); // End Service