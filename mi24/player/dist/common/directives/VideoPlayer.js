(function() {
  define(['swfobject', 'common/Player'], function(swf, Player) {
    return [
      'ConfigLoader', '$compile', 'VideoPlayerCollection', 'HAS_HTML5', function(ConfigLoader, $compile, VideoPlayerCollection, HAS_HTML5) {
        return {
          restrict: 'AE',
          scope: {
            videoId: '=',
            playerId: '=',
            configType: '@'
          },
          link: function(scope, element) {
            scope.config = {};
            ConfigLoader.load(scope);
            scope.configLoaded = {
              player: false,
              source: false
            };
            scope.config.internalPlayerId = scope.$id;
            return scope.$watch('configLoaded', function(newValue) {
              var hasFlash, playerElement;
              if (newValue.player === true && newValue.source === true) {
                hasFlash = swfobject.hasFlashPlayerVersion('11');
                if ((scope.config.useHtmlFirst === true && HAS_HTML5() === true) || (scope.config.useHtmlFirst === false && hasFlash === false && HAS_HTML5() === true)) {
                  playerElement = $compile('<div mi24-html5-player></div>')(scope);
                } else {
                  playerElement = $compile('<div mi24-flash-player></div>')(scope);
                }
                element.append(playerElement);
                VideoPlayerCollection.addPlayer(scope.$id, new Player(playerElement, navigator.userAgent));
                return scope.$emit('playerAddedToCollection');
              }
            }, true);
          }
        };
      }
    ];
  });

}).call(this);
