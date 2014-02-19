(function() {
  define(['angular', 'common/services/HttpService', 'common/services/VideoPlayerCollection', 'common/services/UtilService'], function(angular, HttpService, VideoPlayerCollection, UtilService) {
    'use strict';
    return angular.module('Mi24HTMLPlayer.Common.Services', []).factory('HttpService', HttpService).service('UtilService', UtilService).service('VideoPlayerCollection', VideoPlayerCollection);
  });

}).call(this);
