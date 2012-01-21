(function(){
  var getRandomString;
  // GET home page.
  exports.index = function(req, res) {
    return res.render('index', {
      title: 'Reorder',
      scripts: ['https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js', 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js', 'http://ajax.aspnetcdn.com/ajax/jquery.templates/beta1/jquery.tmpl.min.js']
    });
  };
  exports.indexPost = function(req, res) {
    var id;
    // TODO: save!
    // now give the client-side code information about the saved list
    id = getRandomString(5);
    return res.send({
      data: {
        id: id
      }
    });
  };
  getRandomString = function(len) {
    var _a, _b, i, id;
    id = '';
    _a = 1; _b = len;
    for (i = _a; (_a <= _b ? i <= _b : i >= _b); (_a <= _b ? i += 1 : i -= 1)) {
      id += String.fromCharCode((Math.random() * 25) + 65);
    }
    return id;
  };
})();
