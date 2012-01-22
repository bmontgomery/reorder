Helpers = {
	toAbsolute: ( url, req ) ->
		'http://' + req.headers.host + url
}

DynamicHelpers = {
	req: ( req, res ) ->
		req
}

exports.Helpers = Helpers
exports.DynamicHelpers = DynamicHelpers
