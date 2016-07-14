(function () {
    angular
        .module('app')
        .controller('GradingController', [
            '$stateParams', '$mdEditDialog',
            '$rootScope','$state','$localStorage', 
            'tasksService', '$mdDialog','pdfService', '$window',
            '$timeout',
            GradingController
        ]);

    function GradingController($stateParams, $mdEditDialog, 
                               $rootScope, $state, 
                               $localStorage, tasksService,
                               $mdDialog, pdfService, $window, $timeout) {
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
          vm.killTheCat = true; //Will disabe the sendToJefeDEpartamento BUtton
          vm.limitOptions = [5, 10, 15];
          vm.filter = {}
          vm.query = {
              order: 'claveUnica',
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
          vm.tableData = $localStorage.getObject($stateParams.transactionId);
          console.log(vm.tableData)
          if(vm.tableData.catCalificaciones){
            //This is the array of the possible grades
            vm.grades = $.map(vm.tableData.catCalificaciones, function(item){
            var array = [];
            array.push(item);
              return item;
            });
          }
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
                modelValue: student.calificacion,
                placeholder: 'Agrega la Calificacion',
                save: function (input) { /*THIS IS THE MAIN FOCUS PART*/
                  student.calificacion = input.$modelValue;
                },
                targetEvent: event,
                title: 'Agrega la Calificacion',
                validators: {
                  'md-maxlength': 4,
                  type:"number",
                  pattern: vm.regex
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
             var newGrades = angular.toJson(vm.tableData.alumnos,true);
             var variables = {
                              "action" : "complete",
                              "variables" : [
                                  {
                                    "name":"approveProf",
                                    "type":"string",
                                    "value":"false",
                                    "scope":"global"
                                },
                                {
                                    "name" : "alumnos",
                                    "scope" : "global",
                                    "type" : "string",
                                    "value" : newGrades
                                }
                              ]
                            }
              tasksService.release(vm.tableData.taskId,variables)
              $localStorage.setObject($stateParams.transactionId, null);
              $state.go($rootScope.previousState);
          }
          function DialogController(){
            console.log("hola desde el controller del dialogo")
          }
          function printPdf(ev) {
            /*  This function has like purpose to preview the pdf of the transaction (Acta)
             *  Strategy:
             *  1. 
             *  2. 
             *  3. 
             */
             
             $mdDialog.show({
                controller: function () { this.parent = $scope; },
                contentElement: '#myDialog',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false
              });
             // The POST object or GET or wathever
             var object = {
                  SWBGRUP_TERM_CODE: vm.tableData.swbgrupTermCode,
                  SWBGRUP_CRN: vm.tableData.swbgrupCrn,
                  calificaciones: angular.toJson(vm.tableData.alumnos)
                 }
             pdfService.create(object).then(function(response){
                var file = new window.Blob([response.data], {type: 'application/pdf'});
                var fileURL = URL.createObjectURL(file);
                console.log(fileURL)
                //To add some UX use the timeout
                $timeout(function(){
                  window.open(fileURL);
                  $mdDialog.hide();
                },500)
                
              }, function(error){
                console.error(error);
              });

          }
          function sendTransaction(ev) {
            /*  This function has the purpose of start the transaction i the activiti backend
             *  Strategy:
             *  1. 
             *  2. 
             *  3. Go back to the last function
             */
             var confirm = $mdDialog.confirm()
              .title('Firmado Acta')
              .textContent('¿Estas Seguro de firmar y enviar el Acta al Jefe de Departamento')
              .ariaLabel('Firmando Actas')
              .targetEvent(ev)
              .ok('Si')
              .cancel('Cancelar');
             
              $mdDialog.show(confirm).then(function(){
                var newGrades = angular.toJson(vm.tableData.alumnos,true);
                var variables = {
                              "action" : "complete",
                              "variables" : [
                                  {
                                    "name":"approveProf",
                                    "type":"string",
                                    "value":"true",
                                    "scope":"global"
                                },
                                {
                                    "name" : "alumnos",
                                    "scope" : "global",
                                    "type" : "string",
                                    "value" : newGrades
                                }
                              ]
                }
                console.log(variables)
                tasksService.release(vm.tableData.taskId,variables)
                $state.go($rootScope.previousState);
              },function(){
                console.log("NO quiere enviarla")
              });              
          }

    }
})();
