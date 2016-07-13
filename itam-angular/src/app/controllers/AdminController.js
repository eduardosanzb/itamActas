(function(){

  angular
    .module('app')
    .controller('AdminController', [
       '$mdDialog','adminService','processService',
      AdminController
    ]);

  function AdminController( $mdDialog, adminService, processService) {
        /*  Template:   app/views/table-teacher.html
         *  $state:     home.grading
         *  - Variables
         *  ..- limitOptions: Options for the pagination of the table
         *  ..- filter: Empty object for the query filter of the table
         *  ..- query: Options for the query/order/pagination of the table
         *  ..- options: Options for the table structure
         *  - Services
         *  ..- studentService: Retrieving dummy data for the table
         *  - Functions
         *  ..- startTransaction() : Function to start the transactions selected
         */
        var vm = this;
        /*INITIALIZING VARIABLES*/
          vm.selected = [];
          vm.limitOptions = [5, 10, 15];
          vm.filter = {}
          vm.query = {
              order: 'SWBGRUP_CRN',
              limit: 5,
              page: 1
          };
          vm.options = {
                rowSelection: true,
                multiSelect: true,
                autoSelect: true,
                decapitate: false,
                largeEditDialog: false,
                boundaryLinks: true,
                limitSelect: true,
                pageSelect: true
          };
        /*FUNCTIONS BINDING*/
         vm.startTransactions = startTransactions;
         vm.refreshTransaction = getTransactions;
        /*SERVICES AND DATA API*/
        getTransactions();
            
        /*FUNCTIONS STRUCTURES*/
          function getTransactions(){
            vm.promise = adminService.getTransactions().get().$promise.then(function(data){
              vm.tableData = data.usuariosSrie;
            });
          }
         function startTransactions (ev) {
            /*  This function Creates a confirmation to start the transactions (Actas) and then start the flow.
             *  Strategy:
             *  1. Create a Dialog from the components library
             *  2. Utilize the event binding.
             */
             console.log(vm.selected)
            var confirm = $mdDialog.confirm()
              .title('Activando Actas')
              .textContent('¿Estas Seguro de iniciar ' + vm.selected.length + ' Actas?')
              .ariaLabel('Iniciando Actas')
              .targetEvent(ev)
              .ok('Si')
              .cancel('Cancelar');
              $mdDialog.show(confirm).then(function() {
                  console.log('Confirmando las Actas');
                  console.log(vm.selected)
                  angular.forEach(vm.selected, function(task){
                    var newInstance = {
                      "processDefinitionKey":"itamActasProcess",
                      "variables": [
                        {
                          "name":"swbgrupTermCode",
                          "value":task.SWBGRUP_TERM_CODE
                        },
                        {
                          "name":"swbgrupCrn",
                          "value":task.SWBGRUP_CRN
                        },
                        {
                          "name":"comentarios",
                          "value":null
                        }
                      ]
                    }
                    var oldTransaction = {
                      "swbgrupTermCode":task.SWBGRUP_TERM_CODE,
                      "swbgrupCrn":task.SWBGRUP_CRN
                    }
                    vm.selected = [];
                    vm.filter = {};
                    processService.resolve(newInstance).$promise.then(function(){
                    //adminService.releaseTransaction(oldTransaction).then(getTransactions);
                    getTransactions();

                    });
                  }); //forEach
                }, function() {
                  console.log('No estuvo seguro');
                });
          }


  }

})();
