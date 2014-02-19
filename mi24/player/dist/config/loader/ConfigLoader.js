(function() {
  define(['config/loader/ConfigLoaderInterface'], function(ConfigLoaderInterface) {
    var ConfigLoaderProvider;
    return ConfigLoaderProvider = (function() {
      function ConfigLoaderProvider() {
        this.loaders = [];
      }

      ConfigLoaderProvider.prototype.addLoader = function(loader) {
        var exception;
        if (loader instanceof ConfigLoaderInterface) {
          return this.loaders.push(loader);
        } else {
          exception = {
            name: "InstanceException",
            message: "Loader given to \"ConfigLoaderProvider.addloader\"  " + ("is not instance of \"ConfigLoaderInterface\" is typeof " + (typeof loader) + ".")
          };
          throw exception;
        }
      };

      ConfigLoaderProvider.prototype.load = function(scope) {
        var exception, loader, _i, _len, _ref;
        _ref = this.loaders;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          loader = _ref[_i];
          if (loader.support(scope.configType)) {
            return loader.load(scope);
          }
        }
        exception = {
          name: "TypeLoaderException",
          message: "Type \"" + scope.configType + "\" is not supported."
        };
        throw exception;
      };

      return ConfigLoaderProvider;

    })();
  });

}).call(this);
