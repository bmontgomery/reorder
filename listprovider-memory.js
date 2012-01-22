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
    result = null;
    _a = 0; _b = this.dummyData.length - 1;
    for (i = _a; (_a <= _b ? i <= _b : i >= _b); (_a <= _b ? i += 1 : i -= 1)) {
      if (this.dummyData[i].id === id) {
        result = this.dummyData[i];
        break;
      }
    }
    return callback(null, result);
  };
  ListProvider.prototype.save = function(lists, callback) {
    var _a, _b, i, list;
    typeof lists.length === 'undefined' ? (lists = [lists]) : null;
    _a = 0; _b = lists.length - 1;
    for (i = _a; (_a <= _b ? i <= _b : i >= _b); (_a <= _b ? i += 1 : i -= 1)) {
      list = lists[i];
      list.id = listCounter++;
      list.created_at = new Date();
      this.dummyData[this.dummyData.length] = list;
    }
    return callback(null, lists);
  };
  // bootstrap with dummy data
  new ListProvider().save([
    {
      name: 'list 1',
      textID: 'YSNKM',
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
