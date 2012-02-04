productionSettings = {
	dbHost: 'staff.mongohq.com'
	dbPort: 10029,
	dbName: 'app2570362'
	dbAuth: true
	dbUser: 'heroku'
	dbPassword: 'CherryBrown42'
}

devSettings = {
	dbHost: 'localhost'
	dbPort: 27017,
	dbName: 'node-mongo-reorder'
	dbAuth: false
}

settings = devSettings

if process.env.NODE_ENV is 'production'
	settings = productionSettings

exports.Settings = settings
