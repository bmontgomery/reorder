(function(){
  var ListProvider, listProvider;
  ListProvider = require('../listprovider-mongodb.js').ListProvider;
  listProvider = new ListProvider('staff.mongodb.com', 10029);
  // GET home page.
  exports.index = function(req, res) {
    var viewData;
    viewData = {
      title: 'Reorder',
      scripts: ['https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js', 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js', 'http://ajax.aspnetcdn.com/ajax/jquery.templates/beta1/jquery.tmpl.min.js'],
      item: ''
    };
    if (req.params.id && req.params.id.match("^[A-Z]+$")) {
      // console.log 'loading existing list with id ' + req.params.id
      return listProvider.findByTextID(req.params.id, function(x, r) {
        // console.log 'found item ' + r.textID
        viewData.item = r;
        return res.render('index', viewData);
      });
    } else {
      return res.render('index', viewData);
    }
  };
  exports.indexPost = function(req, res) {
    // console.log 'saving list with id ' + req.body.textID
    return listProvider.save(req.body, function(x, lists) {
      return res.send({
        data: {
          id: lists[0].textID
        }
      });
    });
  };
})();
