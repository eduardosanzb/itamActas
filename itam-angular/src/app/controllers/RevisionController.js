(function(){

  angular
    .module('app')
    .controller('RevisionController', 
      ['$state', 'tasksService', '$http', 'Base64','studentService',
      RevisionController]);

  function RevisionController($state, tasksService,  $http, Base64, studentService) {
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
     //refreshTasks();
     studentService.loadAllItems().then(function(data){
      console.log(data)
      vm.tableData = data;
     })
      
    

     


    /*FUNCTIONS STRUCTURES*/
      function startRevision(transactionId) {
        console.log("We are going to review the transaction");
        console.log(vm.actas)
        $state.go('home.statistics',{transactionId:transactionId});
      }
      function refreshTasks(){
        vm.promise = tasksService.all("jefeDepartamento1").$promise;
        vm.actas = [];
        tasksService.all("jefeDepartamento1").$promise.then(function(data){
          data.data.forEach( function(task) {
            var id = task.id;
            tasksService.variables(id).$promise.then(function(data){
              console.log(data)
              var object = data.reduce(function(o, v, i) {
                console.log(o)
                console.log(v)
                console.log(i)
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
    

    


  }

})();
