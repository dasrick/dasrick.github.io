(function() {
  define(['angular', 'ad/AdDirective', 'ad/PreRoll', 'ad/PostRoll', 'ad/MidRoll'], function(angular, AdDirective, PreRoll, PostRoll, MidRoll) {
    var adModule;
    adModule = angular.module('Mi24HTMLPlayer.Ad', []);
    adModule.directive('mi24Ad', AdDirective);
    adModule.factory('PreRoll', PreRoll);
    adModule.factory('MidRoll', MidRoll);
    return adModule.factory('PostRoll', PostRoll);
  });

}).call(this);
