module.exports = {
	"base_url":"",
    "port":"8080",

    // JSON Token Info
    'secret': 'nodeGoneGamerSecret-FzU0ktWSM5lVd!',
    'authDatabase': 'mongodb://localhost:27017/users',

	"databases": {
        "local": {
            "firebase": {
                "desc": "chat",
                "services": "",
                "url": "https://boiling-fire-7287.firebaseio.com/"
        	},
            "mysql": {
                "desc": "Static Data",
                "services": "",
                "host": "",
                "port": 3306,
                "user": "",
                "password": "",
                "database": ""
            },
            "mongo": {
                "desc": "Variable data",
                "services": "authentication",
                "host": "localhost",
                "port": 27017,
                "user": "",
                "password": "",
                "database": "users"
            }
        },
        "prod" :{
            "mysql": {
                "desc": "Static Data",
                "services": "",
                "host": "",
                "port": 3306,
                "user": "",
                "password": "",
                "database": ""
            }
        }
    },
    "email": {
        "mandrill":{
            "key": ""
        }
    }
}