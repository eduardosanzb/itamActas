(function(){
    'use strict';
    angular.module('app')
            .service('loginService', [ 
            '$resource','$http','Base64', '$q', 'ServerUrl', 'groupService',
            loginService
    ]);
    function loginService ($resource, $http, Base64, $q, ServerUrl, groupService) {
      return {
        'auth':function(credentials){
          
          return $resource(ServerUrl + "/activiti-rest/service/identity/users/:userId",
                       null,
                       {
                        get:{
                          method: 'GET',
                          isArray: false,
                          headers:{
                            'Authorization': 'Basic ' + Base64.encode(credentials.userId + ':' + credentials.password)
                          }
                        }
                       })
                        .get({userId:credentials.userId});

        }
      }
      
    }
  })();