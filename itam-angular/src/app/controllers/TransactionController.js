(function(){

  angular
    .module('app')
    .controller('TransactionsController', [
       '$scope', '$state', 'tasksService', '$http', 
       '$localStorage', '$timeout','$rootScope',
       '$mdDialog',
      TransactionsController
    ]);

  function TransactionsController( $scope, $state, tasksService, $http, $localStorage, $timeout, $rootScope, $mdDialog) {
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
      vm.actas = [];
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
      vm.showComments = showComments;
    /*SERVICES AND DATA API*/
      refreshTasks();
    /*FUNCTIONS STRUCTURES*/
      function refreshTasks(){
        var credentials = $localStorage.getObject('auth');
        vm.promise = tasksService.all(credentials.userId).$promise.then(function(data){
          console.log("getting the taaask")
          vm.actas = [];
          data.data.forEach( function(task) {
            var id = task.id;
            if(task.taskDefinitionKey == "profesorTask"){
              tasksService.variables(id).$promise.then(function(data){
                var object = data.reduce(function(o, v, i) {
                      if(v.value && v.value.charAt(0) == '[')
                        o[v.name] = JSON.parse(v.value);  
                      else
                        o[v.name] = v.value;
                      return o;
                    }, {});
                object.taskId = id;
                console.log(object)
                vm.actas.push(object);
              });
            }
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
      function DialogController($scope, $mdDialog, acta){
        console.log(acta)
        $scope.comments = acta.comentarios;
        $scope.hide = function() {
          $mdDialog.hide();
        }
      }
      function showComments(ev,acta){
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'app/views/partials/comments.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          escapeToClose:true,
          fullscreeen: true,
          locals: {
            acta: acta
          }
        }).then(function(answer){
          console.log("ok")
        });
      }


      



     
      

     
      




     

      

    
  }

})();
