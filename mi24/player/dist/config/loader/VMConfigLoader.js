(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['config/loader/ConfigLoaderInterface'], function(ConfigLoaderInterface) {
    var VMConfigLoader;
    return [
      'HttpService', 'XMLConfigParser', '$log', VMConfigLoader = (function(_super) {
        __extends(VMConfigLoader, _super);

        function VMConfigLoader(HttpService, XMLConfigParser, $log) {
          this.HttpService = HttpService;
          this.XMLConfigParser = XMLConfigParser;
          this.$log = $log;
        }

        VMConfigLoader.prototype.support = function(type) {
          return type === 'vm';
        };

        VMConfigLoader.prototype.load = function(scope) {
          this._loadPlayer(scope);
          return this._loadSource(scope);
        };

        VMConfigLoader.prototype._loadPlayer = function(scope) {
          var error, headers, httpCall, successPlayer,
            _this = this;
          headers = {
            Accept: 'application/xml'
          };
          httpCall = {
            method: 'GET',
            url: "/api/video/" + scope.videoId + "/player/" + scope.playerId,
            headers: headers
          };
          successPlayer = function(data) {
            if (angular.isString(data.data)) {
              _this.XMLConfigParser.parsePlayerConfig(data.data, scope.config);
              return scope.configLoaded.player = true;
            } else {
              return error(data);
            }
          };
          error = function(data) {
            return _this.$log.error('player config is not valid', data);
          };
          return this.HttpService(httpCall).then(successPlayer, error);
        };

        VMConfigLoader.prototype._loadSource = function(scope) {
          var error, headers, httpCall, succesSource,
            _this = this;
          headers = {
            Accept: 'application/xml'
          };
          httpCall = {
            method: 'GET',
            url: "/api/video/" + scope.videoId + "/source",
            headers: headers
          };
          succesSource = function(data) {
            if (angular.isString(data.data)) {
              _this.XMLConfigParser.parseSourceConfig(data.data, scope.config);
              return scope.configLoaded.source = true;
            } else {
              return error(data);
            }
          };
          error = function(data) {
            return _this.$log.error('source config is not valid', data);
          };
          return this.HttpService(httpCall).then(succesSource, error);
        };

        return VMConfigLoader;

      })(ConfigLoaderInterface)
    ];
  });

}).call(this);
