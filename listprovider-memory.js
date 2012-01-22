(function(){
  var ListProvider, listCounter;
  listCounter = 1;
  ListProvider = function() {  };
  ListProvider.prototype.dummyData = [];
  ListProvider.prototype.findAll = function(callback) {
    return callback(null, this.dummyData);
  };
  ListProvider.prototype.findById = function(id, callback) {
    var _a, _b, i, result;
    _a = 0; _b = this.dummyData.length - 1;
    for (i = _a; (_a <= _b ? i <= _b : i >= _b); (_a <= _b ? i += 1 : i -= 1)) {
      if (this.dummyData[i].id === id) {
        result = this.dummyData[i];
        break;
      }
    }
    return callback(null, result);
  };
  ListProvider.prototype.findByTextID = function(textID, callback) {
    var _a, _b, i, result;
    _a = 0; _b = this.dummyData.length - 1;
    for (i = _a; (_a <= _b ? i <= _b : i >= _b); (_a <= _b ? i += 1 : i -= 1)) {
      if (this.dummyData[i].textID === textID) {
        result = this.dummyData[i];
        break;
      }
    }
    return callback(null, result);
  };
  ListProvider.prototype.save = function(lists, callback) {
    var _a, _b, i;
    typeof lists.length === 'undefined' ? (lists = [lists]) : null;
    _a = 0; _b = lists.length - 1;
    for (i = _a; (_a <= _b ? i <= _b : i >= _b); (_a <= _b ? i += 1 : i -= 1)) {
      (function() {
        var list;
        list = lists[i];
        console.log(list.id);
        if (list.id && list.id.match("^[A-Z]+$")) {
          return this.findByTextID(list.id, function(x, result) {
            result.name = list.name;
            result.items = list.items;
            return result.items;
          });
        } else {
          list.id = listCounter++;
          list.textID = this.getRandomString(5);
          list.created_at = new Date();
          this.dummyData[this.dummyData.length] = list;
          return this.dummyData[this.dummyData.length];
        }
      }).call(this);
    }
    return callback(null, lists);
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
  // bootstrap with dummy data
  new ListProvider().save([
    {
      name: 'list 1',
      items: [
        {
          name: 'item 1'
        }, {
          name: 'item 2'
        }
      ]
    }
  ], function(error, lists) {  });
  exports.ListProvider = ListProvider;
})();
