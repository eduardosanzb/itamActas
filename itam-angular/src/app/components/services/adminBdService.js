(function(){
    'use strict';
    angular.module('app')
            .service('adminService', [ 
            '$resource','$http','Base64', '$q', 'ServerUrl','$localStorage',
            adminService
    ]);
    function adminService ($resource, $http, Base64, $q, ServerUrl, $localStorage) {
      return {
        "getTransactions" : function(){
          var credentials = $localStorage.getObject('auth');
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
        },
        "releaseTransaction" : function(transaction){
          var credentials = $localStorage.getObject('auth');
          var url = ServerUrl + "/ITAM-1.0/actas/status?swbgrupTermCode=" + transaction.swbgrupTermCode 
                + "&swbgrupCrn=" + transaction.swbgrupCrn;
                console.log(url)
          return $http.get(url);
        }
      }
    }
  })();