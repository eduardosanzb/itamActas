(function(){

  angular
    .module('app')
    .controller('TransactionsController', [
      'tableService', '$scope', 'actasProfesorService',
      TransactionsController
    ]);

  function TransactionsController(tableService, $scope, actasProfesorService) {
    var vm = this;
    vm.selected = [];

    tableService
      .loadAllItems()
      .then(function(tableData) {
        vm.tableData = [].concat(tableData);
        //console.log(vm.tableData);
      });

  console.log(actasProfesorService)



   
  }

})();
