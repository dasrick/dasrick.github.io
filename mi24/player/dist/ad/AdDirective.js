(function() {
  define([], function() {
    return [
      'VideoPlayerCollection', '$window', 'PreRoll', 'PostRoll', 'MidRoll', function(VideoPlayerCollection, $window, PreRoll, PostRoll, MidRoll) {
        return {
          restrict: 'EA',
          replace: true,
          scope: {
            ad: '=',
            config: '='
          },
          template: "<div class=\"mi24-ad-player\"  ng-show=\"showAdPlayer\">\n  <div style=\"height: 100%;width: 100%;position: absolute; top:0\"></div>\n  <video height=\"auto\" width=\"100%\"></video>\n</div>",
          link: function(scope, element) {
            var callback, companionContainerArray, midRoll, midRollPlayCallback, playCallback, player, playerContainer, postRoll, videoContent;
            scope.showAdPlayer = false;
            player = VideoPlayerCollection.getPlayer(scope.config.internalPlayerId);
            playerContainer = $window.document.getElementById(scope.config.internalPlayerId);
            videoContent = playerContainer.getElementsByTagName('video')[0];
            scope.midRolePlayed = false;
            scope.postRoleInit = false;
            companionContainerArray = $window.document.getElementsByClassName('mi24-companion-ad');
            if (scope.ad.type === 'pre') {
              player.addRoll(PreRoll(element[0], scope, videoContent, companionContainerArray), 'pre');
            }
            if (scope.ad.type === 'mid') {
              midRoll = MidRoll(element[0], scope, videoContent, companionContainerArray);
              midRollPlayCallback = function(event) {
                if ((event.target.currentTime / event.target.duration).toFixed(1) >= 0.5) {
                  midRoll.play();
                  scope.midRolePlayed = true;
                  return player.unregisterEventListener('timeupdate', midRollPlayCallback, 1);
                }
              };
              if (player.isMobile()) {
                player.addRoll(midRoll, 'mid');
                player.registerEventListener('timeupdate', midRollPlayCallback, 1);
              } else {
                player.registerEventListener('play', function() {
                  var initCallback;
                  initCallback = function(event) {
                    if ((event.target.currentTime / event.target.duration) >= 0.25) {
                      midRoll.init();
                      return player.unregisterEventListener('timeupdate', initCallback);
                    }
                  };
                  if (!scope.midRolePlayed) {
                    player.registerEventListener('timeupdate', initCallback);
                  }
                  scope.midRolePlayed = false;
                  return player.registerEventListener('timeupdate', midRollPlayCallback, 1);
                });
              }
            }
            if (scope.ad.type === 'post') {
              postRoll = PostRoll(element[0], scope, videoContent, companionContainerArray);
              if (player.isMobile()) {
                player.addRoll(postRoll, 'post');
              } else {
                playCallback = function() {
                  var initCallback;
                  initCallback = function(event) {
                    if ((event.target.currentTime / event.target.duration) >= 0.75) {
                      postRoll.init();
                      return player.unregisterEventListener('timeupdate', initCallback);
                    }
                  };
                  if (!scope.postRoleInit) {
                    player.registerEventListener('timeupdate', initCallback);
                    return scope.postRoleInit = true;
                  }
                };
                player.registerEventListener('play', playCallback, 255);
              }
              callback = function() {
                postRoll.play();
                return scope.postRoleInit = false;
              };
              scope.$parent.$parent.hasPostRoll = true;
              return player.registerEventListener('ended', callback, 255);
            }
          }
        };
      }
    ];
  });

}).call(this);
