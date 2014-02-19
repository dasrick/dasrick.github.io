(function() {
  define(['angular', 'common/directives/VideoPlayer', 'common/directives/Html5Player', 'common/directives/FlashPlayer', 'common/directives/Poster', 'common/directives/BigPlay'], function(angular, VideoPlayer, Html5Player, FlashPlayer, Poster, BigPlay) {
    'use strict';
    return angular.module('Mi24HTMLPlayer.Common.Directives', []).directive('mi24VideoPlayer', VideoPlayer).directive('mi24Html5Player', Html5Player).directive('mi24FlashPlayer', FlashPlayer).directive('mi24Poster', Poster).directive('mi24BigPlay', BigPlay).value('HAS_HTML5', function() {
      return !!document.createElement('video').canPlayType;
    });
  });

}).call(this);
