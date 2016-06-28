(function(){

  angular
    .module('app')
    .controller('TableController', [
      'instanceService',
      TableController
    ]);

  function TableController(instanceService) {
    /*  Template:   app/views/table.html
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
          vm.editComment = editComment;
          vm.editGrade = editGrade;
          vm.saveDraft = saveDraft;
          vm.printPdf = printPdf;
          vm.sendTransaction = sendTransaction;
        /*SERVICES AND DATA API*/
            instanceService
              .loadAllItems()
              .then(function(tableData) {
                vm.tableData = [].concat(tableData);
              });
        /*FUNCTIONS STRUCTURES*/
          function editComment (event, student) {
              event.stopPropagation(); // in case autoselect is enabled
              
              var editDialog = {
                modelValue: student.comment,
                placeholder: 'Agrega un Comentario',
                save: function (input) {
                  student.comment = input.$modelValue;
                },
                targetEvent: event,
                title: 'Agrega un Comentario',
                validators: {
                  'md-maxlength': 50
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
          function editGrade (event, student) {
              event.stopPropagation(); // in case autoselect is enabled
              
              var editDialog = {
                modelValue: student.comment,
                placeholder: 'Agrega la Calificacion',
                save: function (input) {
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
              //console.log($rootScope.previousState);
              $state.go($rootScope.previousState);
          }
          function printPdf() {
              console.log("Previewing the PDF");
          }
          function sendTransaction() {
              console.log("Starting the transaction sender");
          }
    

    


    


  }

})();
