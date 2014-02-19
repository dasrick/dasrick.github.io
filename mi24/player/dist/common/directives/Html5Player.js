(function() {
  define([], function() {
    return [
      '$sce', '$compile', function($sce, $compile) {
        return {
          restrict: 'EA',
          link: function(scope, element) {
            var $html, disablePlayer, enablePlayer, link, videoElement, videoTag;
            $html = angular.element(document.getElementsByTagName('html')[0]);
            link = document.createElement('link');
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('media', 'screen');
            link.setAttribute('type', 'text/css');
            link.setAttribute('href', "/media/css/player.css");
            $html.find('head').append(link);
            scope.validUrl = $sce.trustAsResourceUrl;
            scope.showPlayer = true;
            videoTag = "<video controls height=\"{{config.height}}\" width=\"{{config.width}}\" >\n  <source src=\"{{validUrl(sourceObject.url)}}\" type='{{sourceObject.format}}'\n   ng-repeat='sourceObject in config.sources.mq' />\n</video>";
            if (scope.config.thumbnail != null) {
              element.append($compile('<div mi24-poster></div>')(scope));
            }
            element.addClass('mi24-player mi24-content');
            element.attr('id', scope.$id);
            element.css('height', scope.config.height);
            element.css('width', scope.config.width);
            videoElement = $compile(videoTag)(scope);
            element.append(videoElement);
            disablePlayer = function() {
              videoElement.css('visibility', 'hidden');
              return scope.$apply();
            };
            enablePlayer = function() {
              scope.showPlayer = true;
              videoElement.css('visibility', 'visible');
              return scope.$apply();
            };
            scope.$on('preRollStarted', disablePlayer);
            scope.$on('preRollEnded', enablePlayer);
            scope.$on('midRollStarted', disablePlayer);
            scope.$on('midRollEnded', enablePlayer);
            scope.$on('postRollStarted', disablePlayer);
            scope.$on('postRollEnded', enablePlayer);
            return scope.$on('playerAddedToCollection', function() {
              var adTemplate;
              if (VideoPlayerCollection.getPlayer(scope.$id).isMobile()) {
                videoElement.removeAttr('controls');
              }
              if (scope.config.ads) {
                adTemplate = '<div mi24-ad config="config" ad="adObject" ng-repeat="adObject in config.ads"></div>';
                element.append($compile(adTemplate)(scope));
              }
              if (scope.config.bigPlayButton != null) {
                return element.append($compile('<div mi24-big-play></div>')(scope));
              }
            });
          }
        };
      }
    ];
  });

}).call(this);
