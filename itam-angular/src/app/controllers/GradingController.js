(function () {
    angular
        .module('app')
        .controller('GradingController', [
            '$stateParams','studentService', '$mdEditDialog','$rootScope','$state',
            GradingController
        ]);

    function GradingController($stateParams, studentService, $mdEditDialog, $rootScope, $state) {
    /*  Template:   app/views/partials/grading.html
     *  $state:     home.grading
     *  - Variables
     *  ..- limitOptions: Options for the pagination of the table
     *  ..- filter: Empty object for the query filter of the table
     *  ..- query: Options for the query/order/pagination of the table
     *  ..- options: Options for the table structure
     *  - Services
     *  ..- studentService: Retrieving dummy data for the table
     *  - Functions
     *  ..- editGrade() :  Helper function to open the dialog in the table, will ng-model the grade
     *      to the table object.  
     *  ..- saveDraft() : button fnc to save the draft and go back to the table.
     *  ..- printPdf() : button fnc to print a preview of the transaction pdf for the teacher.
     *  ..- sendTransaction() : button fnc to POST the table-content object and go back to the list.
     */
        var vm = this;
        /*INITIALIZING VARIABLES*/
          vm.limitOptions = [5, 10, 15];
          vm.filter = {}
          vm.query = {
              order: 'studentId',
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
          };
        /*FUNCTIONS BINDING*/
          vm.editGrade = editGrade;
          vm.saveDraft = saveDraft;
          vm.printPdf = printPdf;
          vm.sendTransaction = sendTransaction;
        /*SERVICES AND DATA API*/
            studentService
              .loadAllItems()
              .then(function(tableData) {
                vm.tableData = [].concat(tableData);
                //console.log(vm.tableData);
              });
        /*FUNCTIONS STRUCTURES*/
          function editGrade (event, student) {
            /*  This function is an append of the component github. 
             *   https://github.com/daniel-nagy/md-data-table#edit-dialogs
             *  Main focus for the strategy: save function
             *  Strategy:
             *  1.Get the imput value
             *  2. Append the value to the object
             *  3.
             */
              event.stopPropagation(); // in case autoselect is enabled
              
              var editDialog = {
                modelValue: student.comment,
                placeholder: 'Agrega la Calificacion',
                save: function (input) { /*THIS IS THE MAIN FOCUS PART*/
                  student.grade = input.$modelValue;
                },
                targetEvent: event,
                title: 'Agrega la Calificacion',
                validators: {
                  'md-maxlength': 4,
                  type:"number"
                }
              };
              
              var promise;
              promise = $mdEditDialog.small(editDialog);
              
              
              promise.then(function (ctrl) {
                var input = ctrl.getInput();
                
                input.$viewChangeListeners.push(function () {
                  input.$setValidity('test', input.$modelValue !== 'test');
                });
              });
          };
          function saveDraft() {
             /*  This function has like purpose save a draft of the table-object
             *  Strategy:
             *  1. 
             *  2. 
             *  3. Go back to the last function
             */
              //console.log($rootScope.previousState);
              $state.go($rootScope.previousState);
          }
          function printPdf() {
            /*  This function has like purpose to preview the pdf of the transaction (Acta)
             *  Strategy:
             *  1. 
             *  2. 
             *  3. Go back to the last function
             */
              console.log("Previewing the PDF");
          }
          function sendTransaction() {
            /*  This function has the purpose of start the transaction i the activiti backend
             *  Strategy:
             *  1. 
             *  2. 
             *  3. Go back to the last function
             */
              console.log("Starting the transaction sender");
          }

       
    }
})();
