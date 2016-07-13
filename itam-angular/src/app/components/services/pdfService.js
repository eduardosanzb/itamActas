(function(){
    'use strict';
    angular.module('app')
            .service('pdfService', [ 
            '$resource','$http','Base64', '$q', 'ServerUrl', 'groupService',
            pdfService
    ]);
    function pdfService ($resource, $http, Base64, $q, ServerUrl, groupService) {
      return {
        'create':function(variables){          
          variables = JSON.stringify(variables);
          console.log(variables)
          var url = 'http://192.168.1.125:9080'
          return $resource( url + "/ITAM/example/reporte",
                       null,
                       {
                        get:{
                          method: 'POST',
                          isArray: false
                        }
                       })
                        .get(variables);

        }
      }
      
    }
  })();