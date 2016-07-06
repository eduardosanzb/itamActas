(function(){
    'use strict';
    angular.module('app')
            .service('processService', [ 
            '$resource','$http','Base64', '$q', 'ServerUrl','$localStorage',
            processService
    ]);
    function processService ($resource, $http, Base64, $q, ServerUrl, $localStorage) {
      var credentials = $localStorage.getObject('auth');
      return $resource(ServerUrl.concat("/activiti-rest/service/runtime/process-instances"),
                       null,
                       {
                        resolve:{
                          method: 'POST',
                          isArray: false,
                          headers:{
                            'Authorization': 'Basic ' + Base64.encode(credentials.userId + ':' + credentials.password)
                          }
                        }
                       });
    }
  })();