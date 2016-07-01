(function(){
  'use strict';

  angular.module('app')
          .service('actasProfesorService', [
          '$q','$http',
          actasProfesorService
  ]);

  function actasProfesorService($q, $http){

      // $http({
      //     method: 'GET',
      //     //url: 'http://profesor1:welcome1@192.168.1.98:8080/activiti-rest/service/runtime/tasks?assignee=profesor1'
      //       //url: 'http://admin:welcome1@192.168.1.98:8080/activiti-rest/service/management/tables/ACT_ID_MEMBERSHIP/data'
      //       url: 'http://cloud.lucasianmexico.com:8585/activiti-rest/service/management/tables/ACT_ID_MEMBERSHIP/data'
      //   }).then(function successCallback(response) {
      //       // this callback will be called asynchronously
      //       // when the response is available
      //       console.log(response);
      //       var items = response;
      //     }, function errorCallback(response) {
      //       // called asynchronously if an error occurs
      //       // or server returns response with an error status.
      //       var items = [hols];
      //       console.log('Error: ');
      //       console.log(response);
      //     });

      $http.defaults.headers.common['Authorization'] = 
           'Basic ' + 'admin:admin';

    return {
      loadAllItems : function() {
        
        $http({
          method: 'GET',
          //url: 'http://profesor1:welcome1@192.168.1.98:8080/activiti-rest/service/runtime/tasks?assignee=profesor1'
            //url: 'http://admin:welcome1@192.168.1.98:8080/activiti-rest/service/management/tables/ACT_ID_MEMBERSHIP/data'
            url: 'http://cloud.lucasianmexico.com:8585/activiti-rest/service/management/tables/ACT_ID_MEMBERSHIP/data'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log(response);
            var items = response;
            return items;
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            return response;
            console.log('Error: ');
            console.log(response);
          });
      }
    };
  }

})();
