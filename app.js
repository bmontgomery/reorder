(function(){
  var app, express, helpers, port, publicDir, routes;
  // Module dependencies.
  express = require('express');
  routes = require('./routes');
  helpers = require('./helpers.js');
  app = (module.exports = express.createServer());
  publicDir = __dirname + '/public';
  // Configuration
  app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    return app.use(express.static(publicDir));
  });
  app.configure('development', function() {
    app.use(express.logger());
    return app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
  });
  app.configure('production', function() {
    return app.use(express.errorHandler());
  });
  // Helpers
  app.helpers(helpers.Helpers);
  app.dynamicHelpers(helpers.DynamicHelpers);
  // Routes
  app.get('/', routes.index);
  app.get('/:id', routes.index);
  app.post('/', routes.indexPost);
  app.post('/:id', routes.indexPost);
  port = process.env.PORT || 3000;
  app.listen(port);
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
})();
