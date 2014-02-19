(function() {
  define([], function() {
    return [
      'VideoPlayerCollection', function(VideoPlayerCollection) {
        return {
          replace: true,
          template: "<div class=\"mi24-poster\" ng-show=\"showPoster\"></div>",
          restrict: 'EA',
          link: function(scope, element) {
            var disablePoster, enablePoster;
            element.addClass('mi24-poster');
            scope.showPoster = true;
            element.css('background-image', "url(" + scope.config.thumbnail + ")");
            disablePoster = function() {
              scope.showPoster = false;
              return scope.$apply();
            };
            enablePoster = function() {
              scope.showPoster = true;
              return scope.$apply();
            };
            scope.$on('preRollStarted', disablePoster);
            return scope.$on('playerAddedToCollection', function() {
              VideoPlayerCollection.getPlayer(scope.$id).registerEventListener('play', function() {
                scope.showPoster = false;
                return scope.$apply();
              });
              return VideoPlayerCollection.getPlayer(scope.$id).registerEventListener('ended', function() {
                if (scope.hasPostRoll) {
                  return scope.$on('postRollEnded', enablePoster);
                } else {
                  return enablePoster();
                }
              });
            });
          }
        };
      }
    ];
  });

}).call(this);
