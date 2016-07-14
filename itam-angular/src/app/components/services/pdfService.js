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
          var url = ServerUrl + '/ITAM-1.0/reportes/big';  
          var config = {
            responseType: 'arraybuffer',
            params: variables
            }
           return $http.get(url,config);
        }
      }//return body
    }
  })();