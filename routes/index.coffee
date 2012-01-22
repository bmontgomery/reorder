ListProvider = require('../listprovider-memory.js').ListProvider
listProvider = new ListProvider()

# GET home page.

exports.index = ( req, res ) ->
	# TODO: if req.params.id is populated, load up the list; otherwise, use a new list
	viewData = {
		title: 'Reorder'
		scripts: ['https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js','https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js','http://ajax.aspnetcdn.com/ajax/jquery.templates/beta1/jquery.tmpl.min.js']
	}

	if req.params.id and req.params.id > 0
		listProvider.findById parseInt(req.params.id), ( x, r ) ->
			viewData.item = r
			res.render 'index', viewData
	else
		res.render 'index', viewData

exports.indexPost = ( req, res ) ->
	listProvider.save req.body, ( x, lists ) ->
		res.send {
			data: {
				id: lists[0].textID
			}
		}

