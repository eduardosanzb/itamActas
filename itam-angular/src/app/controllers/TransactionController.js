(function(){

  angular
    .module('app')
    .controller('TransactionsController', [
      'tableService', '$scope', 'actasProfesorService', '$state',
      TransactionsController
    ]);

  function TransactionsController(tableService, $scope, actasProfesorService, $state) {
    /*  Template:   app/views/transactions.html
     *  $state:     home.transactions
     *  - Variables
     *  ..- limitOptions: Options for the pagination of the table
     *  ..- filter: Empty object for the query filter of the table
     *  ..- query: Options for the query/order/pagination of the table
     *  ..- options: Options for the table structure
     *  - Services
     *  ..- tableService: Retrieving dummy data for the table
     *  - Functions
     *  ..- startTransaction(tId): Start the garding for the transaction
     */
    var vm = this;
    /*INITIALIZING VARIABLES*/
      vm.limitOptions = [5, 10, 15];
      vm.filter = {}
      vm.query = {
          order: 'period',
          limit: 5,
          page: 1
      };
      vm.options = {
        rowSelection: false,
        multiSelect: false,
        autoSelect: false,
        decapitate: false,
        largeEditDialog: false,
        boundaryLinks: true,
        limitSelect: true,
        pageSelect: true
      }
    /*FUNCTIONS BINDING*/
      vm.startTransaction = startTransaction;
    /*SERVICES AND DATA API*/
    console.log(actasProfesorService.loadAllItems())
      tableService
      .loadAllItems()
      .then(function(tableData) {
        vm.tableData = [].concat(tableData);
        console.log(vm.tableData);
      });

    /*FUNCTIONS STRUCTURES*/
      function startTransaction(transactionId){
        /*  
         *  Strategy:
         *  1. Log the id
         *  2. Go to the state of grading with the transaction id as
         *    a parameter.
         */
        console.log("Starting to grade the transaction id: " + transactionId);
        $state.go('home.grading',{transactionId:transactionId});
      }

    
  }

})();
