(function () {
    angular
        .module('app')
        .controller('GradingController', [
            '$stateParams','studentService', '$mdEditDialog','$rootScope','$state',
            GradingController
        ]);

    function GradingController($stateParams, studentService, $mdEditDialog, $rootScope, $state) {
    /*  Template:   app/views/partials/grading.html
     *  $state:     home.garding
     *  - Variables
     *  - Services
     *  - Functions
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
        vm.editComment = editComment;
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
