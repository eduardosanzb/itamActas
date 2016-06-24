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
        name: 'Estadisticas',
        icon: 'assessment',
        sref: '.dashboard'
      },
      {
        name: 'Actas',
        icon: 'assignment',
        sref: '.transactions'
      },
      {
        name: 'Instancias',
        icon: 'view_module',
        sref: '.table'
      }
    ];

    return {
      loadAllItems : function() {
        return $q.when(menuItems);
      }
    };
  }

})();
