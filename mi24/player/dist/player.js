(function() {
  define(['angular', 'common/directives/directives', 'common/services/services', 'config/ConfigModule', 'ad/AdModule'], function(angular, CommonDirectives, CommonServices, ConfigModule, AdModule) {
    'use strict';
    return angular.module('Mi24HTMLPlayer', ['Mi24HTMLPlayer.Config', 'Mi24HTMLPlayer.Ad', 'Mi24HTMLPlayer.Common.Directives', 'Mi24HTMLPlayer.Common.Services']);
  });

}).call(this);
