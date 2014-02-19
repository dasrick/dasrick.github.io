(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['ad/AdRoll'], function(AdRoll) {
    var PostRoll, _ref;
    PostRoll = (function(_super) {
      __extends(PostRoll, _super);

      function PostRoll() {
        _ref = PostRoll.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      PostRoll.prototype.init = function() {
        var _this = this;
        this.initAdsManager = function() {
          var adError;
          try {
            return this.adsManager.init(this.scope.config.width, this.scope.config.height, google.ima.ViewMode.NORMAL);
          } catch (_error) {
            adError = _error;
          }
        };
        this.adsManagerListener[google.ima.AdEvent.Type.ALL_ADS_COMPLETED] = function() {
          if (_this.adsManager != null) {
            _this.adsManager.destroy();
          }
          _this.scope.showAdPlayer = false;
          _this.scope.$emit('postRollEnded');
          return _this.scope.$apply();
        };
        this.adsManagerListener[google.ima.AdEvent.Type.AD_ERROR] = this.onAdError;
        this.adsManagerListener[google.ima.AdEvent.Type.STARTED] = function(adEvent) {
          if (adEvent.getAd().isLinear()) {
            _this.scope.showAdPlayer = true;
            _this.scope.$emit('postRollStarted');
            return _this.scope.$apply();
          }
        };
        return PostRoll.__super__.init.apply(this, arguments);
      };

      PostRoll.prototype.play = function() {
        if (this.adsManager == null) {
          this.init();
        }
        if (this.adsManager != null) {
          return this.adsManager.start();
        }
      };

      return PostRoll;

    })(AdRoll);
    return [
      function() {
        return function(element, scope, videoContent, companionContainerArray) {
          return new PostRoll(element, scope, videoContent, companionContainerArray);
        };
      }
    ];
  });

}).call(this);
