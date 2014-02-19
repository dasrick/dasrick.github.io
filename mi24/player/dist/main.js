(function() {
  require.config({
    baseUrl: "dist",
    paths: {
      angular: '../bower_components/angular/angular',
      angular_mocks: '../bower_components/angular-mocks/angular-mocks',
      Mi24HTMLPlayer: 'player',
      requireLib: '../bower_components/requirejs/require',
      swfobject: '../bower_components/swfobject/swfobject/src/swfobject',
      xml2json: '../bower_components/x2js/xml2json',
      videoAds: '//s0.2mdn.net/instream/html5/ima3'
    },
    shim: {
      angular_mocks: {
        deps: ['angular']
      },
      angular: {
        exports: 'angular'
      }
    }
  });

  require(['angular', 'Mi24HTMLPlayer', 'requireLib'], function(angular, Mi24HTMLPlayer) {
    'use strict';
    return angular.element(document).ready(function() {
      var $html, root;
      $html = angular.element(document.getElementsByTagName('html')[0]);
      angular.bootstrap($html, ['Mi24HTMLPlayer']);
      root = typeof exports !== "undefined" && exports !== null ? exports : window;
      return root.VideoPlayerCollection = angular.element(document).injector().get('VideoPlayerCollection');
    });
  });

}).call(this);
