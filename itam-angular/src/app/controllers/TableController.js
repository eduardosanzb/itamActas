(function(){

  angular
    .module('app')
    .controller('TableController', [
      'instanceService',
      TableController
    ]);

  function TableController(instanceService) {
    var vm = this;
    vm.tableData = [];
    vm.instanceForActivate = [];
    vm.selectedRowCallback = selectedRowCallback;
    vm.activateInstances = activateInstances;

    instanceService
      .loadAllItems()
      .then(function(tableData) {
        vm.tableData = [].concat(tableData);
      });


    function selectedRowCallback(rows){
      console.log(rows)
        vm.instanceForActivate = rows;   
    };

    function activateInstances () {
      var theInstances = [];
      vm.instanceForActivate.forEach( function(element, index) {
        theInstances.push(index);  
        });
      alert(theInstances)
    };


  }

})();
