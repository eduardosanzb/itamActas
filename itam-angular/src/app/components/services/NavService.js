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
        sref: '.revision'
      },
      {
        name: 'Modificacion Actas',
        icon: 'assignment',
        sref: '.transactions'
      },
      {
        name: 'Creacion Actas',
        icon: 'view_module',
        sref: '.teacher'
      }
    ];

    return {
      loadAllItems : function() {
        return $q.when(menuItems);
      }
    };
  }

})();
