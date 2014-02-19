(function() {
  define([], function() {
    var ConfigLoaderInterface;
    return ConfigLoaderInterface = (function() {
      function ConfigLoaderInterface() {}

      ConfigLoaderInterface.prototype.support = function(type) {
        var exception;
        exception = {
          name: "ImplementException",
          message: ("Class \"" + (this.constructor.toString().match(/function (.{1,})\(/)[1]) + "\" ") + "must implement function \"support\"."
        };
        throw exception;
      };

      ConfigLoaderInterface.prototype.load = function(scope) {
        var exception;
        exception = {
          name: "ImplementException",
          message: ("Class \"" + (this.constructor.toString().match(/function (.{1,})\(/)[1]) + "\" ") + "must implement function \"load\"."
        };
        throw exception;
      };

      return ConfigLoaderInterface;

    })();
  });

}).call(this);
