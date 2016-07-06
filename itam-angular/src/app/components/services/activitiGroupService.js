(function(){
    'use strict';
    angular.module('app')
            .service('groupService', [ 
            '$resource','$http','Base64', '$q', 'ServerUrl',
            groupService
    ]);
    function groupService ($resource, $http, Base64, $q, ServerUrl) {
      return $resource(ServerUrl.concat("/activiti-rest/service/management/tables/ACT_ID_MEMBERSHIP/data?size=100"),
                       null,
                       {
                        get:{
                          method: 'GET',
                          isArray: false,
                          headers:{
                            'Authorization': 'Basic ' + Base64.encode("admin:admin")
                          }
                        }
                       });
    }
  })();