(function(){
  'use strict';

  angular.module('app')
          .service('actasProfesorService', [
          '$q','$http',
          actasProfesorService
  ]);

  function actasProfesorService($q, $http){

      $http({
          method: 'GET',
          url: 'http://profesor1:welcome1@192.168.1.98:8080/activiti-rest/service/runtime/tasks?assignee=profesor1'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log(response);
            var items = response;
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log('Error: ');
            console.log(response);
          });

    return {
      loadAllItems : function() {
        return $q.when(items);
      }
    };
  }

})();
