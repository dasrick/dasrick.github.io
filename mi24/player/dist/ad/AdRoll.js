(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(['videoAds'], function() {
    var AdRoll;
    return AdRoll = (function() {
      function AdRoll(element, scope, videoContent, companionContainerArray) {
        this.element = element;
        this.scope = scope;
        this.videoContent = videoContent;
        this.companionContainerArray = companionContainerArray;
        this.onAdError = __bind(this.onAdError, this);
        this.onAdsManagerLoaded = __bind(this.onAdsManagerLoaded, this);
        this.adsManagerListener = {};
      }

      AdRoll.prototype.init = function() {
        var adDisplayContainer, adsLoader, adsRequest, clickElement, videoElement;
        videoElement = this.element.getElementsByTagName('video')[0];
        clickElement = this.element.getElementsByTagName('div')[0];
        adDisplayContainer = new google.ima.AdDisplayContainer(this.element, videoElement, clickElement);
        adDisplayContainer.initialize();
        adsLoader = new google.ima.AdsLoader(adDisplayContainer);
        adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this.onAdsManagerLoaded, false);
        adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdError, false);
        adsRequest = new google.ima.AdsRequest();
        adsRequest.adTagUrl = this.scope.ad.uri;
        adsRequest.linearAdSlotWidth = 640;
        adsRequest.linearAdSlotHeight = 400;
        adsRequest.nonLinearAdSlotWidth = 640;
        adsRequest.nonLinearAdSlotHeight = 150;
        return adsLoader.requestAds(adsRequest);
      };

      AdRoll.prototype.getAdVideoPlayer = function() {
        return this.element.getElementsByTagName('video')[0];
      };

      AdRoll.prototype.onAdsManagerLoaded = function(adsManagerLoadedEvent) {
        var callback, eventName, _ref,
          _this = this;
        this.adsManager = adsManagerLoadedEvent.getAdsManager(this.videoContent);
        _ref = this.adsManagerListener;
        for (eventName in _ref) {
          callback = _ref[eventName];
          this.adsManager.addEventListener(eventName, callback);
        }
        this.adsManager.addEventListener(google.ima.AdEvent.Type.STARTED, function(adEvent) {
          var box, companionAds, _i, _len, _ref1, _results;
          _ref1 = _this.companionContainerArray;
          _results = [];
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            box = _ref1[_i];
            companionAds = adEvent.getAd().getCompanionAds(box.getAttribute('width'), box.getAttribute('height'));
            if (companionAds.length > 0) {
              _results.push(box.innerHTML = companionAds[0].getContent());
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        });
        return this.initAdsManager();
      };

      AdRoll.prototype.onAdError = function(adErrorEvent) {
        console.log(adErrorEvent.getError());
        console.log(adErrorEvent.getError().getMessage());
        if (this.adsManager != null) {
          this.adsManager.destroy();
        }
        this.scope.showAdPlayer = false;
        this.scope.$apply();
        return this.videoContent.play();
      };

      return AdRoll;

    })();
  });

}).call(this);
