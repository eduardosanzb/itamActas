(function(){

  angular
    .module('app')
    .controller('TransactionsController', [
       '$scope', '$state', 'tasksService', '$http', '$localStorage', '$timeout',
      TransactionsController
    ]);

  function TransactionsController( $scope, $state, tasksService, $http, $localStorage, $timeout) {
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
      vm.refreshTasks = refreshTasks;
    /*SERVICES AND DATA API*/
      refreshTasks();

    /*FUNCTIONS STRUCTURES*/
      function refreshTasks(){
        vm.promise = tasksService.all("profesor1").$promise;
        vm.actas = [];
        tasksService.all("profesor1").$promise.then(function(data){
          data.data.forEach( function(task) {
            var id = task.id;
            tasksService.variables(id).$promise.then(function(data){
              var object = data.reduce(function(o, v, i) {
                    if(v.value.charAt(0) == '[')
                      o[v.name] = JSON.parse(v.value);  
                    else
                      o[v.name] = v.value;
                    return o;
                  }, {});
              object.taskId = id;
              vm.actas.push(object);
            });
            //return actas;
          });
        })
      }
      function startTransaction(transaction){
        /*  
         *  Strategy:
         *  1. Log the id
         *  2. Go to the state of grading with the transaction id as
         *    a parameter.
         */
         console.log(transaction.taskId)
        $localStorage.setObject(transaction.taskId,transaction)
        $state.go('home.grading',{transactionId:transaction.taskId});
      }



      



     
      

     
      




     

      

    
  }

})();
