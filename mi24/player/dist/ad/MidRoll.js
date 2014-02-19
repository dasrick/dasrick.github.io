(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['ad/AdRoll'], function(AdRoll) {
    var MidRoll, _ref;
    MidRoll = (function(_super) {
      __extends(MidRoll, _super);

      function MidRoll() {
        _ref = MidRoll.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      MidRoll.prototype.init = function() {
        var _this = this;
        this.initAdsManager = function() {
          var adError;
          try {
            return this.adsManager.init(this.scope.config.width, this.scope.config.height, google.ima.ViewMode.NORMAL);
          } catch (_error) {
            adError = _error;
          }
        };
        this.adsManagerListener[google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED] = function() {
          return _this.videoContent.pause();
        };
        this.adsManagerListener[google.ima.AdEvent.Type.ALL_ADS_COMPLETED] = function() {
          if (_this.adsManager != null) {
            _this.adsManager.destroy();
          }
          _this.scope.showAdPlayer = false;
          _this.scope.$emit('midRollEnded');
          _this.scope.$apply();
          return _this.videoContent.play();
        };
        this.adsManagerListener[google.ima.AdEvent.Type.AD_ERROR] = this.onAdError;
        this.adsManagerListener[google.ima.AdEvent.Type.STARTED] = function(adEvent) {
          if (adEvent.getAd().isLinear()) {
            _this.scope.showAdPlayer = true;
            _this.scope.$emit('midRollStarted');
            return _this.scope.$apply();
          }
        };
        return MidRoll.__super__.init.apply(this, arguments);
      };

      MidRoll.prototype.play = function() {
        if (this.adsManager == null) {
          this.init();
        }
        if (this.adsManager != null) {
          return this.adsManager.start();
        }
      };

      return MidRoll;

    })(AdRoll);
    return [
      function() {
        return function(element, scope, videoContent, companionContainerArray) {
          return new MidRoll(element, scope, videoContent, companionContainerArray);
        };
      }
    ];
  });

}).call(this);
