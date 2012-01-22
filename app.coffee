# Module dependencies.

express = require 'express'
routes = require './routes'
app = module.exports = express.createServer()
publicDir = __dirname + '/public'

# Configuration

app.configure( () ->
		app.set 'views', __dirname + '/views'
		app.set 'view engine', 'jade'
		app.use express.bodyParser()
		app.use express.methodOverride()
		app.use app.router
		app.use express.static(publicDir)
)

app.configure('development', () ->
		app.use express.logger()
		app.use express.errorHandler({ dumpExceptions: true, showStack: true })
)

app.configure('production', () ->
		app.use express.errorHandler() 
)

# Routes

app.get '/', routes.index
app.get '/:id', routes.index
app.post '/', routes.indexPost

port = process.env.PORT || 3000
app.listen port
console.log "Express server listening on port %d in %s mode", app.address().port, app.settings.env
