(function() {
  define([], function() {
    return [
      'VideoPlayerCollection', '$window', 'UtilService', function(VideoPlayerCollection, $window, UtilService) {
        return {
          replace: true,
          template: "<div class=\"mi24-big-play\"  ng-show=\"showBigPlayButton\" ng-click=\"startBigPlay()\"></div>",
          restrict: 'EA',
          link: function(scope, element) {
            var bigPlay, config, cssStyleContainer, cssValues, observer, playerContainer, rules, setPositionButton, yRule;
            scope.showBigPlayButton = true;
            bigPlay = scope.config.bigPlayButton;
            element.attr('id', "mi24-big-play-" + scope.$id);
            playerContainer = $window.document.getElementById(scope.$id);
            cssStyleContainer = $window.getComputedStyle(playerContainer);
            setPositionButton = function() {
              var cssValues, left, top;
              if (bigPlay.customButton) {
                left = (parseInt(cssStyleContainer.width, 10) - bigPlay.normal.width) / 2;
                top = (parseInt(cssStyleContainer.height, 10) - bigPlay.normal.height) / 2;
              } else {
                left = (parseInt(cssStyleContainer.width, 10) - bigPlay.dimension.width) / 2;
                top = (parseInt(cssStyleContainer.height, 10) - bigPlay.dimension.height) / 2;
              }
              cssValues = {
                left: left + 'px',
                top: top + 'px'
              };
              return element.css(cssValues);
            };
            if ($window.MutationObserver) {
              observer = new $window.MutationObserver(function(mutations) {
                return mutations.forEach(function() {
                  return setPositionButton();
                });
              });
              config = {
                attributes: true
              };
              observer.observe(playerContainer, config);
            } else {
              playerContainer.addEventListener('DOMAttrModified', function(ev) {
                if (ev.relatedNode.ownerElement.getAttribute('id') === scope.$id) {
                  return setPositionButton();
                }
              }, false);
            }
            if (bigPlay.customButton) {
              setPositionButton();
              cssValues = {
                height: bigPlay.normal.height + 'px',
                width: bigPlay.normal.width + 'px',
                'background-position': "center center",
                'background-image': "url(" + bigPlay.normal.uri + ")",
                'background-repeat': "no-repeat"
              };
              rules = {};
              rules["#mi24-big-play-" + scope.$id] = cssValues;
              rules["#mi24-big-play-" + scope.$id + ":hover"] = {
                "background-image": "url(" + bigPlay.hover.uri + ")"
              };
            } else {
              setPositionButton();
              cssValues = {
                height: bigPlay.dimension.height + 'px',
                width: bigPlay.dimension.width + 'px',
                'background-position': "-" + bigPlay.position.x + "px " + bigPlay.position.y + "px",
                'background-image': "url(" + scope.config.skinPng + ")"
              };
              rules = {};
              rules["#mi24-big-play-" + scope.$id] = cssValues;
              yRule = "-" + (bigPlay.position.y + (4 * bigPlay.dimension.height)) + "px";
              rules["#mi24-big-play-" + scope.$id + ":hover"] = {
                "background-position-y": yRule
              };
              yRule = "-" + (bigPlay.position.y + (2 * bigPlay.dimension.height)) + "px";
              rules["#mi24-big-play-" + scope.$id + ":active"] = {
                "background-position-y": yRule
              };
            }
            UtilService.addStylesheetRules(rules);
            VideoPlayerCollection.getPlayer(scope.$id).registerEventListener('loadedmetadata', function() {
              return setPositionButton();
            });
            $window.addEventListener('resize', function() {
              return setPositionButton();
            });
            VideoPlayerCollection.getPlayer(scope.$id).registerEventListener('play', function() {
              scope.showBigPlayButton = false;
              return scope.$apply();
            });
            VideoPlayerCollection.getPlayer(scope.$id).registerEventListener('ended', function() {
              if (scope.hasPostRoll) {
                return scope.$on('postRollEnded', function() {
                  scope.showBigPlayButton = true;
                  return scope.$apply();
                });
              } else {
                scope.showBigPlayButton = true;
                return scope.$apply();
              }
            });
            return scope.startBigPlay = function() {
              return VideoPlayerCollection.getPlayer(scope.$id).play();
            };
          }
        };
      }
    ];
  });

}).call(this);
