(function(){

  angular
    .module('app')
    .controller('RevisionController', 
      ['$state', 'tasksService', '$http',
       'Base64','studentService', '$localStorage',
       '$rootScope',
      RevisionController]);

  function RevisionController($state, tasksService,  
                              $http, Base64, 
                              studentService, $localStorage, 
                              $rootScope) {
    /*  Template:   app/views/revision.html
     *  $state:     home.revision
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
     vm.startRevision = startRevision;
     vm.refreshTasks = refreshTasks;
    /*SERVICES AND DATA API*/
     refreshTasks();


    /*FUNCTIONS STRUCTURES*/
      function startRevision(transaction) {
        //console.log("We are going to review the transaction" + transaction.taskId);
        $localStorage.setObject(transaction.taskId,transaction)
        $state.go('home.statistics',{transactionId:transaction.taskId});
      }
      function refreshTasks(){
        vm.actas = [];
        vm.promise = tasksService.all($rootScope.auth.userId).$promise;
        tasksService.all($rootScope.auth.userId).$promise.then(function(data){
          data.data.forEach( function(task) {
            if(task.taskDefinitionKey == "departamentoTask" || task.taskDefinitionKey == "direccionTask"){
              var id = task.id;
              tasksService.variables(id).$promise.then(function(data){
                var object = data.reduce(function(o, v, i) {
                  if(v.value){
                    if(v.value.charAt(0) == '[')
                        o[v.name] = JSON.parse(v.value);  
                      else
                        o[v.name] = v.value;
                  }
                      return o;
                    }, {});
                object.taskId = id;
                vm.actas.push(object);
              });
            }
          });
        })
      }
      
    

    





  }
})();
