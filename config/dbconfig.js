'use strict';
var config = {
	development : {
		database : {
			host : 'localhost',
			user : 'root',
			password : '',
			port:3306,
			database : 'rose_bay',
			connectionLimit : 10, //important
			logging: (process.env.MYSQL_LOGGING == 'NO') || false,
			debug: (process.env.MYSQL_DEBUG == 'YES') || false
		}
		
	},
};
module.exports =config
