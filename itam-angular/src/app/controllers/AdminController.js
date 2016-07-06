(function(){

  angular
    .module('app')
    .controller('AdminController', [
      'instanceService', '$mdDialog','adminService',
      AdminController
    ]);

  function AdminController(instanceService, $mdDialog, adminService) {
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
              order: 'studentId',
              limit: 5,
              page: 1
          };
          vm.options = {
                rowSelection: true,
                multiSelect: true,
                autoSelect: false,
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
            vm.promise = adminService.get().$promise.then(function(data){
              vm.tableData = data.usuariosSrie;
              console.log(data.usuariosSrie)
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
                  //TODO what u have to do with the confirmaction
                }, function() {
                  console.log('No estuvo seguro');
                });
          }


  }

})();
