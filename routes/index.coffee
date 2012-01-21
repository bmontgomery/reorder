# GET home page.

exports.index = ( req, res ) ->
  res.render 'index', { 
    title: 'Reorder'
    scripts: ['https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js','https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js','http://ajax.aspnetcdn.com/ajax/jquery.templates/beta1/jquery.tmpl.min.js']
  }

exports.indexPost = ( req, res ) ->
	# TODO: save!
	# now give the client-side code information about the saved list
	console.log req.body.id
	if req.body.id and req.body.id != ''
		res.send ''
	else
		id = getRandomString 5
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
