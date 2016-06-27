(function(){
  'use strict';

  angular.module('app')
          .service('studentService', [
          '$q',
          studentService
  ]);

  function studentService($q){
    var menuItems = [
      {
        id: '1',
        name: 'Miguelito'
      },
       {
        id: '2',
        name: 'Alejandra'
      },
      {
        id: '3',
        name: 'Klemen'
      }
    ];

    return {
      loadAllItems : function() {
        return $q.when(menuItems);
      }
    };
  }

})();
