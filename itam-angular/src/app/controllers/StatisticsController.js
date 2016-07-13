(function(){

  angular
    .module('app')
    .controller('StatisticsController', 
      ['$state', '$scope', '$rootScope', 'tasksService','googleChartApiPromise',
       '$stateParams', '$localStorage', '$mdDialog','$timeout','pdfService',
      StatisticsController]);

  function StatisticsController($state, $scope, $rootScope, tasksService, googleChartApiPromise, 
                                $stateParams, $localStorage, $mdDialog, $timeout, pdfService) {
    /*  Template:   app/views/statistics.html
     *  $state:     home.statistics
     *  - Variables
     *  ..- limitOptions: Options for the pagination of the table
     *  ..- filter: Empty object for the query filter of the table
     *  ..- query: Options for the query/order/pagination of the table
     *  ..- options: Options for the table structure
     *  ..- labelNa: The value of the columns in the chart
     *  ..- labelAll: The value of the columns in the chart
     *  ..- Series: The Strings for the MD charts (one u can see on the view)
     *  - Services
     *  ..- calculationForGraphs():  This variable ignite the calculations needed
     *  ..- tableService: Retrieving dummy data for the table
     *  ..- googleChartApiPromise: Get the gAPI and then creates the charts and the URIs
     *  - Functions
     *  ..- returnGrades(): Helper function
     *  ..- calculationForTheGraphs(): Logic for the graphs data
     *  ..- signTransaction(): Split by role function to release a TRUE 'Acta'
     *  ..- reject(): Split by role function to release a FALSE 'Acta'
     *  ..- DialogController(): The controller of the dialog
     *  ..- previewPdf(): Call the ALAN service to generate the pdf and open in a new tab
     */

    // This bind the DOM to our variables, is a way to hide the $scope.
    var vm = this;
    /*INITIALIZING VARIABLES*/
      vm.limitOptions = [5, 10, 15];
      vm.role = $localStorage.getObject('groups').indexOf("direccion"); // 0 == true ; -1 == false
      vm.filter = {}
      vm.query = {
          //The list ordered by default using the claveUnica element of each student
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
      vm.labelNa = ["6","7","8","9","10"];
      vm.labelAll = ["6", "7","8","9","10","NA" ];
      vm.series = ['Calificación'];

      /*FUNCTIONS BINDING*/
        //Here the functions are binded to the $scope using the vm atribute 
        //  of the controller
        vm.signTransaction = signTransaction;
        vm.reject = reject;
        vm.previewPdf = previewPdf;

        
    /*SERVICES AND DATA API*/
      //Get the data for the table form the $LocalStorage
      $timeout(calculationForGraphs(),3000); // I set a timeout to generate a visual effect
      // This is the data of the table. THIS IS IMPORTANT
      //If this comment is removed the program will blow up
      vm.tableData = $localStorage.getObject($stateParams.transactionId);
      // All this is the configuration and logic of the google graphs that will
      //  be send to the pdf
      googleChartApiPromise.then(function(data){
        /*  This is a Promise for the Google charts API, then we can create the chart/png
         *  Strategy:
         *  1. Define the data and options for each graph (dataP && dataNP)
         *  2. Get the divs for each chart
         *  3. Create the instance of the chart
         *  4. For each chart we create a listener waiting for the rendering. Willnot fireup until step 5
         *  5. We start drawing the chart
         */
         var students = $localStorage.getObject($stateParams.transactionId).alumnos;
         //Here we map the grades for the graphs
         var data = students.map(returnGrades).reduce(function(all, current, index, array){
                switch (parseInt(current)) {
                  case 6:
                    all[0]++;
                    break;
                  case 7:
                    all[1]++;
                    break;
                  case 8:
                    all[2]++;
                    break;
                  case 9:
                    all[3]++;
                    break;
                  case 10:
                    all[4]++;
                    break;
                  default:
                    all[5]++;
                    break;
                }
                return all;
              },[0,0,0,0,0,0])
         var dataAll = google.visualization.arrayToDataTable([
            ["Calificacion", "Alumnos" ],
            ["6", data[0]],
            ["7", data[1]],
            ["8", data[2]],
            ["9", data[3]],
            ["10",data[4]],
            ["NA",data[5]]
         ]);
         var dataNoNa = google.visualization.arrayToDataTable([
            ["Calificacion", "Alumnos" ],
            ["6", data[0]],
            ["7", data[1]],
            ["8", data[2]],
            ["9", data[3]],
            ["10",data[4]]
         ]);

        var OptionsAll = {'title':'Calificaciones Todo El Grupo',
                       'width':600,
                       'height':300};
        var OptionsNoNa = {'title':'Calificaciones sin NA\'s',
                       'width':600,
                       'height':300};
         

        var chart_all = document.getElementById('chartAll');
        var chart_nona = document.getElementById('chartNoNa');
          
        var chartAll = new google.visualization.ColumnChart(chart_all);
        var chartNoNa = new google.visualization.ColumnChart(chart_nona);

        // Wait for the chart to finish drawing before calling the getImageURI() method.
        google.visualization.events.addListener(chartAll, 'ready', function () {
          chart_all.innerHTML = '<img src="' + chartAll.getImageURI() + '">';
          vm.chartAll = chartAll.getImageURI();
        });
        google.visualization.events.addListener(chartNoNa, 'ready', function () {
          chart_nona.innerHTML = '<img src="' + chartNoNa.getImageURI() + '">';
          vm.chartNoNa = chartNoNa.getImageURI();
        });
          
        chartAll.draw(dataAll, OptionsAll);
        chartNoNa.draw(dataNoNa, OptionsNoNa);
        
        });
    /*FUNCTIONS STRUCTURES*/
      function returnGrades(student){
        // Helper function for the Array.Prototype.map(callback)
        return student.calificacion;
      }
      function calculationForGraphs(){
        /**/
        var students = $localStorage.getObject($stateParams.transactionId).alumnos; // THe data of the 'Acta'
        //The summatory of the grades
        var sumOfGrades = students.map(returnGrades)
            .reduce(function(a,b){
              //We get just the summatory of the grades
              a = (a==="NA") ? 0: parseInt(a);
              b = (b==="NA") ? 0: parseInt(b);
              return parseInt(a)+parseInt(b)
            })
        // A list of the students that not failed
        var smartGroup = students.reduce(function(all, current, index){
          if(current.calificacion !== "NA"){
            all.push(current)
          }
          return all
        },[])
        /* THIS VARIABLES GO TO THE DOM */
        vm.averageWithNA = sumOfGrades / students.length;
        vm.averageWithoutNA = sumOfGrades / smartGroup.length;

        /*DATA FOR THE CANVAS OF THE GRAPHS, THE ONES IN THE DOM*/
        vm.plotAll = students.map(returnGrades).reduce(function(all, current, index, array){
                //Dear future me/programmer. PLEASE forgive me,
                // I can't even begin to express how sorry I am.
                // Now for real, depending of the grade we create an array with the grades counter
                switch (parseInt(current)) {
                  case 6:
                    all[0][0]++;
                    break;
                  case 7:
                    all[0][1]++;
                    break;
                  case 8:
                    all[0][2]++;
                    break;
                  case 9:
                    all[0][3]++;
                    break;
                  case 10:
                    all[0][4]++;
                    break;
                  default:
                    all[0][5]++;
                    break;
                }
                return all;
              },[[0,0,0,0,0,0]]) // All the students
        vm.plotNoNa = [[]] // Without the NA's students
        vm.plotNoNa[0] = vm.plotAll[0].slice(0,5) // I get rid of the last element
      }
      //This ONE next function is in the DOM in the fab-button in the upper-right
      //  corner of the md-table
      function signTransaction(ev, whoSendIt){
         /*  Strategy:
         *  1. Create the content of the Dialog depending on who is sending
         *  2. Define the variable for the activiti REST depending on who is sending
         *  3. Configuring the dialog with confitm type
         *  4. Showing the dialog
         *  5. If accepted create the checkout object
         *  6. Release the 'Acta' with the tasksService
         *  7. Clear the localstorage of the 'Acta'
         *  8. Go back to the previous state
         */
          var dialogContent = (whoSendIt === "Director") ? "¿Liberar el Acta al Sistema?" : "¿Estas seguro de enviar el Acta a Direcciòn?";
          var role = (whoSendIt === "Director") ? "approveDG" : "approveJD";

          var confirm = $mdDialog.confirm()
                .title('Liberando el Acta').textContent(dialogContent)
                .ariaLabel('Liberando Actas').targetEvent(ev)
                .ok('Si').cancel('Cancelar');
          $mdDialog.show(confirm).then(function(){
            var checkoutObject = {
                  "action" : "complete",
                  "variables" : [{
                          "name":role,
                          "type":"string",
                          "value":"true",
                          "scope":"global"
                      }]
                    }
            
            var claimObject = {
              "action":"claim",
              "assignee":$localStorage.getObject('auth').userId
            }
            /*Please WORK*/
            if(whoSendIt === "Director"){
              console.log("Director")
              //This is Direccion, so we need to claim and then release
              tasksService.release($stateParams.transactionId,claimObject)
              tasksService.release($stateParams.transactionId,checkoutObject);
            } else {
              tasksService.release($stateParams.transactionId,checkoutObject);
            }
            $localStorage.setObject($stateParams.transactionId, null);
            $state.go($rootScope.previousState);
          });
      }
      //This ONE next function is in the DOM in the buttons in the bottom of the md-table
      function reject(ev, whoReject){
        /*  Strategy:
         *  1. Define who is rejecting (Director || Jefe Departamento)
         *  2. Configure the dialog 
         *  3. Create the dialog with the configuration
         *  4. The Logic of the Service is inside the DialogController
         */
         role = (whoReject === "Director") ? "approveDG" : "approveJD";
          var confirm = {
                  controller: DialogController,
                  templateUrl: 'app/views/partials/newCommentDialog.html',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true,
                  escapeToClose:true,
                  fullscreeen: true,
                  locals:{
                    role:role // This is variable decide to whom is the 'Acta' reject
                  }
                }
          $mdDialog.show(confirm);
      }
      //This controlle the Dialog when the reject() is called
      function DialogController($scope, $mdDialog, role){
        //Here I use $scope because Im lazy...
        $scope.submit = function(result){
          /*  STRATEGY:
           *  1. Create the new comment
           *  2. Append the new comment to the comment list
           *  3. Create the Checkout object to the POST
           *   3.1 This object contains the comments and the variable of the rejection 
           *  4. Use the service tasksService to reject the 'Acta'
           *  5. Clear the localStorage
           *  6. Hide the dialog
           *  7. Return to the previous state
           */
          var newComment = {
                what: result,
                who: $localStorage.get('name'),
                timestamp: Date.now()
              }
            vm.tableData.comentarios = (vm.tableData.comentarios) ? vm.tableData.comentarios.concat(newComment) :[].concat(newComment);
            var checkoutObject = {
                "action" : "complete",
                "variables" : [
                    {
                        "name":role,
                        "type":"string",
                        "value":"false",
                        "scope":"global"
                    },
                    {
                        "name":"comentarios",
                        "value":JSON.stringify(vm.tableData.comentarios)
                    }
                ]
            }
            tasksService.release($stateParams.transactionId,checkoutObject);
            $localStorage.setObject($stateParams.transactionId, null);
            $mdDialog.hide();
            $state.go($rootScope.previousState);
        }
        // Function to hide the Dialog
        $scope.hide = function() {
          $mdDialog.hide();
        }
      }
      //This ONE next function is in the DOM in the buttons in the bottom of the md-table
      function previewPdf(){
        var object = {
                  SWBGRUP_TERM_CODE: vm.tableData.SWBGRUP_TERM_CODE,
                  SWBGRUP_CRN: vm.tableData.SWBGRUP_CRN,
                  graficas: [vm.charAll, vm.chartNoNa]
                 }
        console.log(object)
                 
             pdfService.create(object).then(function(pdf){
                $window.open(pdf);
             })
      }

  }
})();
