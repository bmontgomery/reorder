# GET home page.

exports.index = ( req, res ) ->
  res.render 'index', { 
    title: 'Express'
    scripts: ['https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js']
  }
