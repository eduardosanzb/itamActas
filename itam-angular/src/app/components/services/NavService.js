(function(){
  'use strict';

  angular.module('app')
          .service('navService', [
          '$q',
          navService
  ]);

  function navService($q){
    var menuItems = [
      {
        name: 'Estadísticas',
        icon: 'assessment',
        sref: '.revision',
        jefesDepartamentos:true,
        direccion:true
      },
      {
        name: 'Profesor',
        icon: 'assignment',
        sref: '.transactions',
        profesores:true
      },
      {
        name: 'Admin',
        icon: 'view_module',
        sref: '.admin',
        admin:true
      }
    ];

    return {
      loadAllItems : function() {
        return $q.when(menuItems);
      }
    };
  }

})();
