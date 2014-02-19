(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['ad/AdRoll'], function(AdRoll) {
    var PreRoll, _ref;
    PreRoll = (function(_super) {
      __extends(PreRoll, _super);

      function PreRoll() {
        _ref = PreRoll.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      PreRoll.prototype.setTime = function(time) {
        this.time = time;
      };

      PreRoll.prototype.init = function() {
        var _this = this;
        this.initAdsManager = function() {
          var adError;
          try {
            this.adsManager.init(this.scope.config.width, this.scope.config.height, google.ima.ViewMode.NORMAL);
            return this.adsManager.start();
          } catch (_error) {
            adError = _error;
            return this.videoContent.play();
          }
        };
        this.adsManagerListener[google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED] = function() {
          var seekCallback;
          if (_this.time != null) {
            seekCallback = function() {
              _this.videoContent.currentTime = _this.time;
              _this.videoContent.play();
              return _this.videoContent.removeEventListener('loadedmetadata', seekCallback);
            };
            _this.videoContent.addEventListener('loadedmetadata', seekCallback);
            return _this.videoContent.load();
          } else {
            return _this.videoContent.play();
          }
        };
        this.adsManagerListener[google.ima.AdEvent.Type.ALL_ADS_COMPLETED] = function() {
          if (_this.adsManager != null) {
            _this.adsManager.destroy();
          }
          _this.scope.showAdPlayer = false;
          _this.scope.$emit('preRollEnded');
          return _this.scope.$apply();
        };
        this.adsManagerListener[google.ima.AdEvent.Type.AD_ERROR] = this.onAdError;
        this.adsManagerListener[google.ima.AdEvent.Type.LOADED] = function(adEvent) {
          if (adEvent.getAd().isLinear()) {
            _this.scope.showAdPlayer = true;
            _this.scope.$emit('preRollStarted');
            return _this.scope.$apply();
          }
        };
        return PreRoll.__super__.init.apply(this, arguments);
      };

      return PreRoll;

    })(AdRoll);
    return [
      function() {
        return function(element, scope, videoContent, companionContainerArray) {
          return new PreRoll(element, scope, videoContent, companionContainerArray);
        };
      }
    ];
  });

}).call(this);
