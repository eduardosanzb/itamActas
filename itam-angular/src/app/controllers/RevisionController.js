(function(){

  angular
    .module('app')
    .controller('RevisionController', 
      ['$state', 'tasksService', '$http',
       'Base64', '$localStorage',
       '$rootScope','$mdDialog', '$timeout',
      RevisionController]);

  function RevisionController($state, tasksService,  
                              $http, Base64, 
                              $localStorage, 
                              $rootScope, $mdDialog, $timeout) {
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
     vm.startRevision = startRevision;
     vm.refreshTasks = refreshTasks;
     vm.showComments = showComments;
    /*SERVICES AND DATA API*/
     vm.promise = $timeout(function(){
        refreshTasks();
      },1000);


    /*FUNCTIONS STRUCTURES*/
      function startRevision(transaction) {
        //console.log("We are going to review the transaction" + transaction.taskId);
        $localStorage.setObject(transaction.taskId,transaction)
        $state.go('home.statistics',{transactionId:transaction.taskId});
      }
      function filterTasks(tasks){
          var tasksArray = tasks.map(function(task){
            var id = task.id;
            var role = task.taskDefinitionKey;
            if( (role == "departamentoTask") || (role == "direccionTask")){
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
                    vm.actas.push(object)
                    return object;
                  });
                }
          }); 
      }
      function refreshTasks(){
        var credentials = $localStorage.getObject('auth');
        vm.promise = tasksService.all(credentials.userId).$promise;
        tasksService.all(credentials.userId).$promise.then(function(response){
          vm.actas = [];
          filterTasks(response.data);
        })
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
      function DialogController($scope, $mdDialog, acta){
        console.log(acta)
        $scope.comments = acta.comentarios;
        $scope.hide = function() {
          $mdDialog.hide();
        }
      }
      
    

    





  }
})();
