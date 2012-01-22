ListProvider = require('../listprovider-memory.js').ListProvider
listProvider = new ListProvider()

# GET home page.

exports.index = ( req, res ) ->
	# TODO: if req.params.id is populated, load up the list; otherwise, use a new list
	if req.params.id and req.params.id > 0
		listProvider.findById parseInt(req.params.id), ( x, r ) ->
			console.log r
			item = r
			res.render 'index', {
				title: 'Reorder'
				scripts: ['https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js','https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js','http://ajax.aspnetcdn.com/ajax/jquery.templates/beta1/jquery.tmpl.min.js']
				item: item
			}
	else
		res.render 'index', {
			title: 'Reorder'
			scripts: ['https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js','https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js','http://ajax.aspnetcdn.com/ajax/jquery.templates/beta1/jquery.tmpl.min.js']
		}

exports.indexPost = ( req, res ) ->
	if req.body.id and req.body.id != ''
		# TODO: save!
		res.send ''
	else
		id = getRandomString 5
		# TODO: save!
		# now give the client-side code information about the saved list
		res.send {
			data: {
				id: id
			}
		}

getRandomString = ( len ) ->
	id = ''
	for i in [1..len]
		id += String.fromCharCode (Math.random() * 25) + 65
	id
