(function(){
  'use strict';

  angular.module('app')
        .service('instanceService', [
        '$q',
      instanceService
  ]);

  function instanceService($q){
    var tableData = [
      {
        cm: '140414',
        group: 'COM-11212',
        teacher: 'Alan Turing',
        subject: 'Maquinas de Turing',
        chief: 'Winston Churchill',
        date: 'ssss',
        activated: true
      },
      {
        cm: '140414',
        group: 'COM-11212',
        teacher: 'Alan Turing',
        subject: 'Maquinas de Turing',
        chief: 'Winston Churchill',
        date: 'sd',
        activated: false
      },
      {
        cm: '140414',
        group: 'COM-11212',
        teacher: 'Alan Turing',
        subject: 'Maquinas de Turing',
        chief: 'Winston Churchill',
        date: 'ssss',
        activated: true
      },
       {
        cm: '140414',
        group: 'COM-11212',
        teacher: 'Alan Turing',
        subject: 'Maquinas de Turing',
        chief: 'Winston Churchill',
        date: 'ssss',
        activated: true
      },
       {
        cm: '140414',
        group: 'COM-11212',
        teacher: 'Alan Turing',
        subject: 'Maquinas de Turing',
        chief: 'Winston Churchill',
        date: 'ssss',
        activated: true
      }
    ];

    return {
      loadAllItems : function() {
        return $q.when(tableData);
      }
    };
  }
})();
