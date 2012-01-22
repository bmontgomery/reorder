(function(){
  var ListProvider, getRandomString, listProvider;
  ListProvider = require('../listprovider-memory.js').ListProvider;
  listProvider = new ListProvider();
  // GET home page.
  exports.index = function(req, res) {
    // TODO: if req.params.id is populated, load up the list; otherwise, use a new list
    if (req.params.id && req.params.id > 0) {
      return listProvider.findById(parseInt(req.params.id), function(x, r) {
        var item;
        console.log(r);
        item = r;
        return res.render('index', {
          title: 'Reorder',
          scripts: ['https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js', 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js', 'http://ajax.aspnetcdn.com/ajax/jquery.templates/beta1/jquery.tmpl.min.js'],
          item: item
        });
      });
    } else {
      return res.render('index', {
        title: 'Reorder',
        scripts: ['https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js', 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js', 'http://ajax.aspnetcdn.com/ajax/jquery.templates/beta1/jquery.tmpl.min.js']
      });
    }
  };
  exports.indexPost = function(req, res) {
    var id;
    if (req.body.id && req.body.id !== '') {
      // TODO: save!
      return res.send('');
    } else {
      id = getRandomString(5);
      // TODO: save!
      // now give the client-side code information about the saved list
      return res.send({
        data: {
          id: id
        }
      });
    }
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
