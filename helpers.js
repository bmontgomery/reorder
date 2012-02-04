(function(){
  var DynamicHelpers, Helpers, Url;
  Url = require('url');
  Helpers = {
    toAbsolute: function(url, req) {
      return Url.resolve('http://' + req.headers.host, url);
    }
  };
  DynamicHelpers = {
    req: function(req, res) {
      return req;
    }
  };
  exports.Helpers = Helpers;
  exports.DynamicHelpers = DynamicHelpers;
})();
