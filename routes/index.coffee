# GET home page.

exports.index = ( req, res ) ->
  res.render 'index', { 
    title: 'Reorder'
    scripts: ['https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js','https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js','http://ajax.aspnetcdn.com/ajax/jquery.templates/beta1/jquery.tmpl.min.js']
  }
