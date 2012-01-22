(function(){
  var DynamicHelpers, Helpers;
  Helpers = {
    toAbsolute: function(url, req) {
      return 'http://' + req.headers.host + url;
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
