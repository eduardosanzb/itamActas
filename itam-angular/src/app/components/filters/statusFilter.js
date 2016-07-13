(function(){
    'use strict';
    angular.module('app')
            .filter('status', [ status]);
    function status () {
      return function(status) {
          switch(status) {
            case "CARGADA": //Rojo
              return "loaded";
              break;
            case "CALIFICANDO": //Azul
              return "grading";
              break;
            case "REVISION": // Amarillo
              return "revision";
              break;
            case "VALIDACION": // Verde Claro
              return "validation";
              break;
            default : // Verde obscuro
              return "printed";
              break;
          }
       };
    }
  })();