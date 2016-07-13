(function(){

  angular
    .module('app')
    .controller('TransactionsController', [
       '$scope', '$state', 'tasksService', '$http', 
       '$localStorage', '$timeout','$rootScope',
       '$mdDialog',
      TransactionsController
    ]);

  function TransactionsController( $scope, $state, tasksService, $http, 
                                  $localStorage, $timeout, $rootScope, 
                                  $mdDialog) {
    /*  Template:   app/views/transactions.html
     *  $state:     home.transactions
     *  - Variables
     *  ..- actas: Initialization of the object to the table ng-repeat
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
          order: 'periodo',
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
      // The $timeout is beacuse we have to wait for activiti to create new instances
      /*DO NOT REMOVE THE $TIMEOUT or SATAN will overcome GOKU for the control of the earth!!!*/
      //vm.promise is used for the md-table to have a nice good-looking spinner
      vm.promise = $timeout(function(){
        refreshTasks();
      },3000);

    /*FUNCTIONS STRUCTURES*/
      function filterTasks(tasks){
        //Will filter the variables for the professor
        /*  STRATEGY:
         *  1. We map the tasks
         *  2. Retrieve all the variables for each tasks with a service
         *  3. Filter each of the variables inside each task
         *  4. Push each task to the vm.actas that will be injected in the DOM
         */
        var tasksArray = tasks.map(function(task){
          //To track each task we save the id
          var id = task.id;
          // To know if the task is for the professor, will happen if the user is
          // professor aswell a Jefe departamento
          if(task.taskDefinitionKey == "profesorTask"){
                tasksService.variables(id).$promise.then(function(data){
                  console.log(data)
                  // If the variable is an object we will parse it
                  var object = data.reduce(function(o, v, i) {
                        if((v.value && v.value.charAt(0) == '[') || (v.value && v.value.charAt(0) == '{'))
                          o[v.name] = JSON.parse(v.value);  
                        else
                          o[v.name] = v.value;
                        return o;
                      }, {});
                  object.taskId = id;
                  // We push to the DOM object
                  vm.actas.push(object)
                  return object;
                });
              }
        }); 
      }
      function refreshTasks(){
        /*  STRATEGY
         *  1. We get the credentials of the current user
         *  2. Retrieve all the tasks for this user with a service
         *  3. Call filterTasks with the data in response.
         */
        var credentials = $localStorage.getObject('auth');
        // The vm. promise variable is user for the goodlooking progress linear in the md-table
        vm.promise = tasksService.all(credentials.userId).$promise.then(function(response){
          vm.actas = [];
          filterTasks(response.data);
        })
      }
      function startTransaction(transaction){
        /*  
         *  Strategy:
         *  1. localstorage the 'Acta' to be grade
         *  2. Go to the state of grading with the transaction id as
         *    a parameter.
         */
        $localStorage.setObject(transaction.taskId,transaction)
        $state.go('home.grading',{transactionId:transaction.taskId});
      }
      function showComments(ev,acta){
        /*  STRATEGY
         *  1. Create a dialog with proper configuration
         *    1.1 Bind the DialogController
         *  2. WE catch when they click the ok, nothing TODO
         */
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'app/views/partials/comments.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          escapeToClose:true,
          fullscreeen: true,
          locals: {
            // This contains the list of the comments
            acta: acta
          }
        }).then(function(answer){
          console.log("ok")
        });
      }
      function DialogController($scope, $mdDialog, acta){
        // We bind with $scope. Yes $scope because Im freakin lazy....
        $scope.comments = acta.comentarios;
        //Function to hide the dialog.... YOLO
        $scope.hide = function() {
          $mdDialog.hide();
        }
      }

      



     
      

     
      




     

      

    
  }

})();
