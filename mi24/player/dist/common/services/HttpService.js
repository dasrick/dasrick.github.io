(function() {
  define([], function() {
    return [
      '$http', '$q', function($http, $q) {
        return function(requestData, deferred) {
          deferred = $q.defer();
          $http(requestData).success(function(data, status, headers, config) {
            var dataContainer;
            dataContainer = {
              data: data || 'Request Failed',
              status: status,
              headers: headers,
              config: config
            };
            return deferred.resolve(dataContainer);
          }).error(function(data, status, headers, config) {
            var dataContainer;
            dataContainer = {
              data: data || 'Request Failed',
              status: status,
              headers: headers,
              config: config
            };
            return deferred.reject(dataContainer);
          });
          return deferred.promise;
        };
      }
    ];
  });

}).call(this);
