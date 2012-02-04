Url = require 'url'

Helpers = {
	toAbsolute: ( url, req ) ->
		Url.resolve 'http://' + req.headers.host, url 
}

DynamicHelpers = {
	req: ( req, res ) ->
		req
}

exports.Helpers = Helpers
exports.DynamicHelpers = DynamicHelpers
