(function(){
  var BSON, Connection, Db, ListProvider, ObjectID, Server;
  Db = require('mongodb').Db;
  Connection = require('mongodb').Connection;
  Server = require('mongodb').Server;
  BSON = require('mongodb').BSON;
  ObjectID = require('mongodb').ObjectID;
  ListProvider = function(host, port) {
    var that;
    this.db = new Db('node-mongo-reorder', new Server(host, port, {
      auto_reconnect: true
    }, {}));
    that = this;
    return this.db.open(function() {
      return that.getCollection(function(error, list_collection) {
        if (!error) {
          return list_collection.ensureIndex({
            textID: 1
          }, {
            unique: true
          });
        }
      });
    });
  };
  ListProvider.prototype.getCollection = function(callback) {
    return this.db.collection('lists', function(error, list_collection) {
      if (error) {
        return callback(error);
      } else {
        return callback(null, list_collection);
      }
    });
  };
  ListProvider.prototype.findAll = function(callback) {
    return this.getCollection(function(error, list_collection) {
      if (error) {
        return callback(error);
      } else {
        return list_collection.find().toArray(function(error, results) {
          if (error) {
            return callback(error);
          } else {
            return callback(null, results);
          }
        });
      }
    });
  };
  ListProvider.prototype.findById = function(id, callback) {
    return this.getCollection(function(error, list_collection) {
      if (error) {
        return callback(error);
      } else {
        return list_collection.findOne({
          id: list_collection.db.bson_serializer.ObjectID.createFromHexString(id)
        }, function(error, results) {
          if (error) {
            return callback(error);
          } else {
            return callback(null, results);
          }
        });
      }
    });
  };
  ListProvider.prototype.findByTextID = function(textID, callback) {
    return this.getCollection(function(error, list_collection) {
      if (error) {
        return callback(error);
      } else {
        return list_collection.findOne({
          textID: textID
        }, function(error, results) {
          if (error) {
            return callback(error);
          } else {
            return callback(null, results);
          }
        });
      }
    });
  };
  ListProvider.prototype.save = function(lists, callback) {
    var that;
    that = this;
    return this.getCollection(function(error, list_collection) {
      var _a, _b, _c, i, list;
      if (error) {
        return callback(error);
      } else {
        typeof lists.length === 'undefined' ? (lists = [lists]) : null;
        _a = []; _b = 0; _c = lists.length - 1;
        for (i = _b; (_b <= _c ? i <= _c : i >= _c); (_b <= _c ? i += 1 : i -= 1)) {
          _a.push((function() {
            list = lists[i];
            if (list.textID && list.textID.match("^[A-Z]+$")) {
              return that.findByTextID(list.textID, function(x, result) {
                result.items = list.items;
                list_collection.update({
                  _id: result._id
                }, result, function() {                });
                return callback(null, lists);
              });
            } else {
              list.textID = that.getRandomString(5);
              return that.getUniqueRandomString(5, function() {
                list.created_at = new Date();
                return list_collection.insert(list, function() {
                  return callback(null, lists);
                });
              });
            }
          })());
        }
        return _a;
      }
    });
  };
  ListProvider.prototype.getRandomString = function(len) {
    var _a, _b, i, id;
    id = '';
    _a = 1; _b = len;
    for (i = _a; (_a <= _b ? i <= _b : i >= _b); (_a <= _b ? i += 1 : i -= 1)) {
      id += String.fromCharCode((Math.random() * 25) + 65);
    }
    return id;
  };
  ListProvider.prototype.getUniqueRandomString = function(len, callback) {
    var result, that;
    that = this;
    result = this.getRandomString(len);
    return this.findByTextID(result, function(error, results) {
      if (!results || results.length === 0) {
        return callback();
      } else {
        return that.getUniqueRandomString(len, callback);
      }
    });
  };
  exports.ListProvider = ListProvider;
})();
