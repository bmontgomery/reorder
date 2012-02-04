ListProvider = require('../listprovider-mongodb.js').ListProvider
listProvider = new ListProvider 'localhost', 27017

# GET home page.

exports.index = ( req, res ) ->
	viewData = {
		title: 'Reorder'
		scripts: ['https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js','https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js','http://ajax.aspnetcdn.com/ajax/jquery.templates/beta1/jquery.tmpl.min.js']
		item: ''
	}

	if req.params.id and req.params.id.match "^[A-Z]+$"
		# console.log 'loading existing list with id ' + req.params.id
		listProvider.findByTextID req.params.id, ( x, r ) ->
			# console.log 'found item ' + r.textID
			viewData.item = r
			res.render 'index', viewData
	else
		res.render 'index', viewData

exports.indexPost = ( req, res ) ->
	# console.log 'saving list with id ' + req.body.textID
	listProvider.save req.body, ( x, lists ) ->
		res.send {
			data: {
				id: lists[0].textID
			}
		}

