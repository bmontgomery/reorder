(function(){
  var app, express, port, publicDir, routes;
  // Module dependencies.
  express = require('express');
  routes = require('./routes');
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
  // Routes
  app.get('/', routes.index);
  port = process.env.port || 3000;
  app.listen(port);
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
})();
