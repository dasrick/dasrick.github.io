(function() {
  define([], function() {
    var VideoPlayerCollection;
    return [
      '$compile', '$rootScope', VideoPlayerCollection = (function() {
        function VideoPlayerCollection($compile, $rootScope) {
          this.$compile = $compile;
          this.$rootScope = $rootScope;
          this.players = {};
        }

        VideoPlayerCollection.prototype.addPlayer = function(internalId, player) {
          return this.players[internalId] = player;
        };

        VideoPlayerCollection.prototype.getPlayer = function(internalId) {
          var exception, key, player, _ref;
          _ref = this.players;
          for (key in _ref) {
            player = _ref[key];
            if (key === internalId) {
              return player;
            }
          }
          exception = {
            name: "NotFoundException",
            message: "Player with InternalId \"" + internalId + "\" was not found."
          };
          throw exception;
        };

        VideoPlayerCollection.prototype.getPlayerById = function(id) {
          var element, exception, videoContent;
          element = document.getElementById(id);
          if (element != null) {
            videoContent = element.getElementsByClassName('mi24-content');
            if (videoContent.length > 0) {
              id = videoContent[0].getAttribute('id');
              return this.getPlayer(id);
            }
          }
          exception = {
            name: "NotFoundException",
            message: "Player with Id \"" + id + "\" was not found."
          };
          throw exception;
        };

        VideoPlayerCollection.prototype.removePlayerById = function(id) {
          var player;
          player = this.getPlayerById(id);
          return player.element.parent().remove();
        };

        VideoPlayerCollection.prototype.removePlayer = function(internalId) {
          var player;
          player = this.getPlayer(internalId);
          return player.element.parent().remove();
        };

        VideoPlayerCollection.prototype.addPlayerById = function(id) {
          var element, exception;
          element = document.getElementById(id);
          if (element != null) {
            this.$compile(element)(this.$rootScope.$new());
            return true;
          }
          exception = {
            name: "NotFoundException",
            message: "HTML Element with Id \"" + id + "\" was not found."
          };
          throw exception;
        };

        return VideoPlayerCollection;

      })()
    ];
  });

}).call(this);
