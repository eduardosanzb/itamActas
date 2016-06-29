(function(){

  angular
    .module('app')
    .controller('StatisticsController', 
      ['$state', '$scope', 'studentService','googleChartApiPromise',
      StatisticsController]);

  function StatisticsController($state, $scope, studentService,googleChartApiPromise) {
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
      $scope.labels = ["Aprobados", "Reprobados"];
      $scope.dataP = [3, 5];
      $scope.dataNP = [3, 15];
      $scope.colors = ['#096729', '#096729', '#096729'];

    /*FUNCTIONS BINDING*/
    /*SERVICES AND DATA API*/
      studentService
              .loadAllItems()
              .then(function(tableData) {
                vm.tableData = [].concat(tableData);
                //console.log(vm.tableData);
              });
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
            ['Aprobados', 'Reprobados'],
            ['Aprobados',     11],
            ['Reprobados',      2]
          ]);
          var optionsP = {'title':'Sin NP',
                         'width':400,
                         'height':300};
          var dataNP = google.visualization.arrayToDataTable([
            ['Aprobados', 'Reprobados'],
            ['Aprobados',     6],
            ['Reprobados',      4]
          ]);
          var optionsNP = {'title':'Con NP',
                         'width':400,
                         'height':300};

          var chart_p_div = document.getElementById('chartP_div');
          var chart_np_div = document.getElementById('chartNP_div');
          var chartP = new google.visualization.PieChart(chart_p_div);
          var chartNP = new google.visualization.PieChart(chart_np_div);

          // Wait for the chart to finish drawing before calling the getImageURI() method.
          google.visualization.events.addListener(chartP, 'ready', function () {
            chartP_div.innerHTML = '<img src="' + chartP.getImageURI() + '">';
            /*  TODO
             *  1. GET THE URI OF THE IMG
             *  2- POST THE URI TO THE .WAR
             */
          });
           google.visualization.events.addListener(chartNP, 'ready', function () {
            chartNP_div.innerHTML = '<img src="' + chartNP.getImageURI() + '">';
            /*  TODO
             *  1. GET THE URI OF THE IMG
             *  2- POST THE URI TO THE .WAR
             */
          });
          chartP.draw(dataP, optionsP);
          chartNP.draw(dataNP, optionsNP);
        });
    /*FUNCTIONS STRUCTURES*/
    //console.log(canvas2image())
     
    

    

    


  }

})();
