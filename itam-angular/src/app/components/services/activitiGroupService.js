(function(){
    'use strict';
    angular.module('app')
            .service('groupService', [ 
            '$resource','$http','Base64', '$q', 'ServerUrl', '$localStorage',
            groupService
    ]);
    function groupService ($resource, $http, Base64, $q, ServerUrl, $localStorage) {
      return $resource(ServerUrl.concat("/activiti-rest/service/management/tables/ACT_ID_MEMBERSHIP/data?size=100"),
                       null,
                       {
                        get:{
                          method: 'GET',
                          isArray: false,
                          headers:{
                            //Here we use the admin request, beceause in the login we may not have any kind of access
                            'Authorization': 'Basic ' + Base64.encode("admin:admin")
                          }
                        }
                       });
    }
  })();