(function(){
  'use strict';

  angular.module('app')
        .service('tableService', [
        '$q',
      tableService
  ]);

  function tableService($q){
    var tableData = [
      {
        period: '1',
        subject: 'COM-11212',
        group: '023',
        title: 'Maquinas de Turing',
        inspected: true
      },
      {
        period: '2',
        subject: 'COM-11212',
        group: '023',
        title: 'Maquinas de Turing 2',
        inspected: false
      },
      {
        period: '3',
        subject: 'COM-11212',
        group: '023',
        title: 'Matematicas',
        inspected: false
      },
      {
        period: '4',
        subject: 'COM-11212',
        group: '023',
        title: 'Maquinas de Turing',
        inspected: false
      },
      {
        period: '5',
        subject: 'COM-11212',
        group: '023',
        title: 'Maquinas de Turing',
        inspected: false
      },
      {
        period: '6',
        subject: 'COM-11212',
        group: '023',
        title: 'Maquinas de Turing',
        inspected: true
      },
      {
        period: '43',
        subject: 'COM-11212',
        group: '023',
        title: 'Maquinas de Turing 2',
        inspected: false
      },
      {
        period: '23432',
        subject: 'COM-11212',
        group: '023',
        title: 'Matematicas',
        inspected: false
      },
      {
        period: '2233',
        subject: 'COM-11212',
        group: '023',
        title: 'Maquinas de Turing',
        inspected: false
      },
      {
        period: '111',
        subject: 'COM-11212',
        group: '023',
        title: 'Maquinas de Turing',
        inspected: false
      },
      {
        period: '2014',
        subject: 'COM-11212',
        group: '023',
        title: 'lalo de Turing',
        inspected: true
      },
      {
        period: '43',
        subject: 'COM-3212',
        group: '023',
        title: 'Maquinas de Turing 2',
        inspected: false
      },
      {
        period: '23432',
        subject: 'COM-11212',
        group: '023',
        title: 'Matematicas',
        inspected: false
      },
      {
        period: '2233',
        subject: 'COM-11212',
        group: '023',
        title: 'mate de Turing',
        inspected: false
      },
      {
        period: '111',
        subject: 'COM-11212',
        group: '023',
        title: 'sd de Turing',
        inspected: false
      }
    ];

    return {
      loadAllItems : function() {
        return $q.when(tableData);
      }
    };
  }
})();
