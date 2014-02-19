(function() {
  define([], function() {
    var Player;
    return Player = (function() {
      function Player(element, userAgent) {
        this.element = element;
        this.userAgent = userAgent;
        if (this.element.find('video').length === 1) {
          this.isHtml5 = true;
        } else {
          this.isHtml5 = false;
        }
        this.rolls = {};
        this.listener = {};
      }

      Player.prototype.pause = function() {
        if (this.isHtml5) {
          return this.element.find('video')[0].pause();
        } else {
          return this.element.find('object')[0].pauseFlashMovie();
        }
      };

      Player.prototype.stop = function() {
        if (this.isHtml5) {
          this.element.find('video')[0].pause();
          return this.element.find('video')[0].currentTime = this.element.find('video')[0].duration;
        } else {
          return this.element.find('object')[0].stopFlashMovie();
        }
      };

      Player.prototype.toggleMute = function() {
        if (this.isHtml5) {
          if (this.element.find('video')[0].muted) {
            return this.element.find('video')[0].muted = false;
          } else {
            return this.element.find('video')[0].muted = true;
          }
        } else {
          return this.element.find('object')[0].toggleMute();
        }
      };

      Player.prototype.play = function(time) {
        var event, seekCallback,
          _this = this;
        if (time == null) {
          time = null;
        }
        if (this.isHtml5) {
          if (this.element.find('video')[0].currentTime === 0) {
            event = document.createEvent('Event');
            event.initEvent('onplaypressed', true, false);
            this.element.find('video')[0].dispatchEvent(event);
          }
          if (this.isMobile()) {
            if (this.rolls.mid) {
              this.rolls.mid.init();
              this.rolls.mid.getAdVideoPlayer().load();
            }
            if (this.rolls.post) {
              this.rolls.post.init();
              this.rolls.post.getAdVideoPlayer().load();
            }
          }
          if (this.rolls.pre && this.element.find('video')[0].currentTime === 0) {
            if (time != null) {
              this.rolls.pre.setTime(time);
            }
            this.rolls.pre.init();
            if (this.isMobile()) {
              this.rolls.pre.getAdVideoPlayer().load();
              return this.element.find('video')[0].load();
            }
          } else {
            if (time != null) {
              seekCallback = function() {
                _this.element.find('video')[0].currentTime = time;
                _this.element.find('video')[0].play();
                return _this.unregisterEventListener('loadedmetadata', seekCallback);
              };
              this.registerEventListener('loadedmetadata', seekCallback);
              return this.element.find('video')[0].load();
            } else {
              return this.element.find('video')[0].play();
            }
          }
        } else {
          return this.element.find('object')[0].playFlashMovie(time);
        }
      };

      Player.prototype.addRoll = function(callback, type) {
        return this.rolls[type] = callback;
      };

      Player.prototype.isMobile = function() {
        return this.element.find('video')[0].paused && (this.userAgent.match(/(iPod|iPhone|iPad)/) || this.userAgent.toLowerCase().indexOf('android') > -1);
      };

      Player.prototype.unregisterEventListener = function(eventName, removeCallback, priority) {
        var callback, key, _i, _len, _ref, _results;
        if (priority == null) {
          priority = 0;
        }
        if (this.isHtml5) {
          _ref = this.listener[eventName][priority];
          _results = [];
          for (key = _i = 0, _len = _ref.length; _i < _len; key = ++_i) {
            callback = _ref[key];
            if (callback === removeCallback) {
              _results.push(this.listener[eventName][priority].splice(key, 1));
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        } else {
          return this.element.find('object')[0].unregisterEventListener(eventName, removeCallback.toString(), priority);
        }
      };

      Player.prototype.registerEventListener = function(eventName, callback, priority) {
        var callbackWrapper, isNewEventListener,
          _this = this;
        if (priority == null) {
          priority = 0;
        }
        if (this.isHtml5) {
          isNewEventListener = false;
          if (this.listener[eventName] == null) {
            isNewEventListener = true;
            this.listener[eventName] = {};
          }
          if (this.listener[eventName][priority] == null) {
            this.listener[eventName][priority] = [];
          }
          this.listener[eventName][priority].push(callback);
          callbackWrapper = function(event) {
            var k, key, keys, _i, _len, _results;
            keys = [];
            for (k in _this.listener[event.type]) {
              keys.unshift(k);
            }
            _results = [];
            for (_i = 0, _len = keys.length; _i < _len; _i++) {
              key = keys[_i];
              _results.push((function() {
                var _j, _len1, _ref, _results1;
                _ref = this.listener[event.type][key];
                _results1 = [];
                for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
                  callback = _ref[_j];
                  if (callback != null) {
                    _results1.push(callback(event));
                  }
                }
                return _results1;
              }).call(_this));
            }
            return _results;
          };
          if (isNewEventListener) {
            return this.element.find('video')[0].addEventListener(eventName, callbackWrapper);
          }
        } else {
          return this.element.find('object')[0].registerEventListener(eventName, callback.toString(), priority);
        }
      };

      Player.prototype.fillCompanionAd = function(content, height, width) {
        var box, _i, _len, _ref, _results;
        _ref = document.getElementsByClassName('mi24-companion-ad');
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          box = _ref[_i];
          if (box.getAttribute('width') === width && box.getAttribute('height') === height) {
            _results.push(box.innerHTML = content);
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };

      return Player;

    })();
  });

}).call(this);
