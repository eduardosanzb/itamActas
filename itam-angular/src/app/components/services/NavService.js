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
        name: 'Revision Actas',
        icon: 'assessment',
        sref: '.revision',
        jefesDepartamentos:true,
        direccion:true
      },
      {
        name: 'Modificacion Actas',
        icon: 'assignment',
        sref: '.transactions',
        profesores:true
      },
      {
        name: 'Creacion Actas',
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
