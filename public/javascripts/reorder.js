(function(){
  var $, methods;
  $ = jQuery;
  methods = {
    init: function(opts) {
      return this.each(function() {      });
    }
  };
  $.fn.reorder = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' is not defined.');
    }
  };
})();
