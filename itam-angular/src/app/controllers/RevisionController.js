(function(){

  angular
    .module('app')
    .controller('RevisionController', 
      ['$state', 'tasksService', '$http',
       'Base64', '$localStorage',
       '$rootScope','$mdDialog', '$timeout','pdfService',
      RevisionController]);

  function RevisionController($state, tasksService,  
                              $http, Base64, 
                              $localStorage, 
                              $rootScope, $mdDialog, $timeout, pdfService) {
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
      vm.role = $localStorage.getObject('groups').indexOf("direccion"); // 0 == true ; -1 == false
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
      },3000);


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
                    vm.actas.push(object)
                    return object;
                  });
                }
          }); 
      }
      function refreshTasks(){
        var credentials = $localStorage.getObject('auth');
        if(vm.role == 0){ //It is Direccion
          vm.promise = tasksService.all(credentials.userId, true).$promise.then(function(response){
            vm.actas = [];
            filterTasks(response.data);
          })
        } else {
          vm.promise = tasksService.all(credentials.userId, false).$promise.then(function(response){
            vm.actas = [];
            filterTasks(response.data);
          })
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
      function DialogController($scope, $mdDialog, acta){
        $scope.comments = acta.comentarios;
        $scope.hide = function() {
          $mdDialog.hide();
        }
      }
      
    vm.previewPdf = function(){
        var chart1 = (vm.chartAll) ? vm.chartAll : null;
        var chart2 = (vm.chartNoNa) ? vm.chartNoNa : null;
        var acta = vm.tableData;
        var test = [
          {
            nombre : 'Pepepe',
            claveUnica: "alksdjfkñasjdhf",
            calificacion: 2
          },
          {
            nombre : 'Pepepe',
            claveUnica: "alksdjfkñasjdhf",
            calificacion: 2
          },
          {
            nombre : 'Pepepe',
            claveUnica: "alksdjfkñasjdhf",
            calificacion: 2
          }];
        var object = {
          folio: 1,
          crn: 2,
          periodo: 3,
          date: 2323,
          nivel: 2,
          tipo: 2,
          clave: 3,
          grupo: 3,
          departamento: 3,
          nombreMateria: 3,
          alumnos: JSON.stringify(test),
         idJefe: 2,
         ifProfesor:2,
         chart1: chart1,
         chart2: chart2
        }
        pdfService.create(object)
      }

    





  }
})();
