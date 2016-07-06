(function(){
    'use strict';
    angular.module('app')
            .service('adminService', [ 
            '$resource','$http','Base64', '$q', 'ServerUrl','$rootScope',
            adminService
    ]);
    function adminService ($resource, $http, Base64, $q, ServerUrl, $rootScope) {
      var credentials = $rootScope.auth;
      return $resource(ServerUrl.concat("/ITAM-1.0/actas/lstactas"),
                       null,
                       {
                        get:{
                          method: 'GET',
                          isArray: false,
                          headers:{
                            'Authorization': 'Basic ' + Base64.encode(credentials.userId + ':' + credentials.password)
                          }
                        }
                       });
    }
  })();