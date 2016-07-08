(function(){

  angular
    .module('app')
    .controller('StatisticsController', 
      ['$state', '$scope', '$rootScope', 'tasksService','googleChartApiPromise',
       '$stateParams', '$localStorage', '$mdDialog','$timeout',
      StatisticsController]);

  function StatisticsController($state, $scope, $rootScope, tasksService, googleChartApiPromise, 
                                $stateParams, $localStorage, $mdDialog, $timeout) {
    /*  Template:   app/views/statistics.html
     *  $state:     home.statistics
     *  - Variables
     *  ..- limitOptions: Options for the pagination of the table
     *  ..- filter: Empty object for the query filter of the table
     *  ..- query: Options for the query/order/pagination of the table
     *  ..- options: Options for the table structure
     *  ..- labels: The Strings for the MD charts (one u can see on the view)
     *  ..- dataP: The data for the MD chart without np students
     *  ..- dataNP: The data for the MD chart with np students
     *  - Services
     *  ..- tableService: Retrieving dummy data for the table
     *  ..- googleChartApiPromise: Get the gAPI and then creates the charts and the URIs
     *  - Functions
     *  ..- startTransaction(tId): Start the garding for the transaction
     */
    var vm = this;
    /*INITIALIZING VARIABLES*/
      vm.avgInclusive = 0;
      vm.avgExclusive = 0;
      vm.okStudents = 0;
      vm.grades = {
        na:0,
        6:0,
        7:0,
        8:0,
        9:0,
        10:0
      }
      vm.limitOptions = [5, 10, 15];
      vm.role = $localStorage.getObject('groups').indexOf("direccion"); // 0 == true ; -1 == false
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
      
      vm.data = {
        withoutNa:[[]],
        all:[[]]
      }
      $scope.labelNa = ["6","7","8","9","10"];
      $scope.labelAll = ["6", "7","8","9","10","NA" ];
      $scope.series = ['Calificación'];
 

    /*FUNCTIONS BINDING*/
      vm.signTransaction = signTransaction;
      vm.rejectToJefe = rejectToJefe;
      vm.sendToDirector = sendToDirector;
      vm.rejectToProfessor = rejectToProfessor;
    /*SERVICES AND DATA API*/
      //Get the data for the table form the $LocalStorage
      $timeout(calculationForGraphs(),1000);
      vm.tableData = $localStorage.getObject($stateParams.transactionId);
      googleChartApiPromise.then(function(data){
        /*  This is a Promise for the Google charts API, then we can create the chart/png
         *  Strategy:
         *  1. Define the data and options for each graph (dataP && dataNP)
         *  2. Get the divs for each chart
         *  3. Create the instance of the chart
         *  4. For each chart we create a listener waiting for the rendering. Willnot fireup until step 5
         *  5. We start drawing the chart
         */
          var dataP = google.visualization.arrayToDataTable([
            ["Element", "Density", { role: "style" } ],
            ["Copper", 8.94, "#b87333"],
            ["Silver", 10.49, "silver"],
            ["Gold", 19.30, "gold"],
            ["Platinum", 21.45, "color: #e5e4e2"]
          ]);

          var optionsP = {'title':'Sin NP',
                         'width':400,
                         'height':300};
          var dataNP = google.visualization.arrayToDataTable([
            ['6', '7', '8', '9', '10','NA'],
            ['6',     6],
            ['Reprobados',      4]
          ]);
          var optionsNP = {'title':'Con NP',
                         'width':400,
                         'height':300};

          var chart_p_div = document.getElementById('chartP_div');
          //var chart_np_div = document.getElementById('chartNP_div');
          var chartP = new google.visualization.ColumnChart(chart_p_div);
          //var chartNP = new google.visualization.ColumnChart(chart_np_div);

          // Wait for the chart to finish drawing before calling the getImageURI() method.
          google.visualization.events.addListener(chartP, 'ready', function () {
            chartP_div.innerHTML = '<img src="' + chartP.getImageURI() + '">';
            /*  TODO
             *  1. GET THE URI OF THE IMG
             *  2- POST THE URI TO THE .WAR
             */
          });
          //  google.visualization.events.addListener(chartNP, 'ready', function () {
          //   chartNP_div.innerHTML = '<img src="' + chartNP.getImageURI() + '">';
          //   /*  TODO
          //    *  1. GET THE URI OF THE IMG
          //    *  2- POST THE URI TO THE .WAR
          //    */
          // });
          chartP.draw(dataP, optionsP);
          //chartNP.draw(dataNP, optionsNP);
        });
    /*FUNCTIONS STRUCTURES*/
      function calculationForGraphs(){
        var students = $localStorage.getObject($stateParams.transactionId).alumnos;
        students.forEach( function(student) {
          if(student.calificacion && student.calificacion > 6){
            vm.okStudents++;

            vm.avgExclusive += parseFloat(student.calificacion.replace(",", "."));
            vm.avgInclusive += parseFloat(student.calificacion.replace(",", "."));
            vm.grades[student.calificacion]++;
          } else {
            vm.grades.na++;
            vm.avgInclusive = (student.calificacion)? vm.avgExclusive+parseFloat(student.calificacion.replace(",", ".")) : vm.avgExclusive;
          }
        });
        angular.forEach(vm.grades, function(value, key){
          if(key != 'na'){
            vm.data.withoutNa[0].push(value);
            vm.data.all[0].push(value);
          } else {
            vm.data.all[0].push(value);
          }
        })
      }

      function signTransaction(ev){
        /*  Strategy:
         *  1. Get the If from the stateparams
         *  2. Create the checkout object
         *  3. Make the POST to the service
         *  4. Clear the $localStorage
         *  5. Go back previous state
         */
         var confirm = $mdDialog.confirm()
              .title('Liberando Acta')
              .textContent('¿Liberar el Acta al Sistema?')
              .ariaLabel('Liberando Actas')
              .targetEvent(ev)
              .ok('Si')
              .cancel('Cancelar');
          $mdDialog.show(confirm).then(function(){
            var checkoutObject = {
                  "action" : "complete",
                  "variables" : [
                      {
                          "name":"approveDG",
                          "type":"string",
                          "value":"true",
                          "scope":"global"
                      }
                  ]
            }
            tasksService.release($stateParams.transactionId,checkoutObject);
            $localStorage.setObject($stateParams.transactionId, null);
            $state.go($rootScope.previousState);
          }); 
      }
      function sendToDirector(ev){
        /*  Strategy:
         *  1. Get the If from the stateparams
         *  2. Create the checkout object
         *  3. Make the POST to the service
         *  4. Clear the $localStorage
         *  5. Go back previous state
         */
         var confirm = $mdDialog.confirm()
              .title('Confirmando Acta')
              .textContent('¿Estas seguro de enviar el Acta a Direcciòn?')
              .ariaLabel('Liberando Actas')
              .targetEvent(ev)
              .ok('Si')
              .cancel('Cancelar');
          $mdDialog.show(confirm).then(function(){
            var checkoutObject = {
                "action" : "complete",
                "variables" : [
                    {
                        "name":"approveJD",
                        "type":"string",
                        "value":"true",
                        "scope":"global"
                    }
                ]
            }
            tasksService.release($stateParams.transactionId,checkoutObject);
            $localStorage.setObject($stateParams.transactionId, null);
            $state.go($rootScope.previousState);
          });
      }
      function rejectToJefe(ev){
        /*  Strategy:
         *  1. Get the If from the stateparams
         *  2. Create the checkout object
         *  3. Make the POST to the service
         *  4. Clear the $localStorage
         *  5. Go back previous state
         */
          var confirm = {
                  controller: DialogController,
                  templateUrl: 'app/views/partials/newCommentDialog.html',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true,
                  escapeToClose:true,
                  fullscreeen: true,
                  locals:{
                    role:"approveDG"
                  }
                }
          $mdDialog.show(confirm);
      }
      function rejectToProfessor(ev){
        /*  Strategy:
         *  1. Get the If from the stateparams
         *  2. Create the checkout object
         *  3. Make the POST to the service
         *  4. Clear the $localStorage
         *  5. Go back previous state
         */
          var confirm = {
                  controller: DialogController,
                  templateUrl: 'app/views/partials/newCommentDialog.html',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose: true,
                  escapeToClose:true,
                  fullscreeen: true,
                  locals:{
                    role:"approveJD"
                  }
                }
          $mdDialog.show(confirm);
      }


      function previewPdf(){}
      function DialogController($scope, $mdDialog, role){
        $scope.submit = function(result){
          var newComment = {
                value: result,
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
        $scope.hide = function() {
          $mdDialog.hide();
        }
      }
      

    


  }

})();
