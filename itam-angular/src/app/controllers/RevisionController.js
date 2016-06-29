(function(){

  angular
    .module('app')
    .controller('RevisionController', 
      ['$state', 'tableService', '$http', 'Base64',
      RevisionController]);

  function RevisionController($state, tableService,  $http, Base64) {
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
      vm.limitOptions = [5, 10, 15];
      vm.filter = {}
      vm.query = {
          order: 'period',
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
    /*SERVICES AND DATA API*/
      tableService
        .loadAllItems()
        .then(function(tableData) {
          vm.tableData = [].concat(tableData);
          //console.log(vm.tableData);
        });

      
      vm.test = function(){
      console.log('Testing')
      
      
      // $.ajax({
      //       type: "GET",
      //               url: "http://cloud.lucasianmexico.com:8585/activiti-rest/service/management/tables/ACT_ID_MEMBERSHIP/data",
      //               crossDomain: true,
      //               beforeSend: function(xhr) {
      //               xhr.setRequestHeader('Authorization', 'Basic ' + btoa('admin:admin'))
      //               },
      //       dataType: "json",
      //               contentType: "application/javascript",
      //               error: function (json) {
      //               alert("error");
      //               },
      //               success: function(json) {
      //               alert("exito");
      //               }
      //       });
      //$http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode('admin' + ':' + 'admin');
      var cloud = "http://cloud.lucasianmexico.com:8585/activiti-rest/service/management/tables/ACT_ID_MEMBERSHIP/data"
      var cloud2 = "http://cloud.lucasianmexico.com:8585/activiti-rest/service/management/tables/ACT_ID_MEMBERSHIP/data"
      var tux = "http://192.168.1.98:8080/activiti-rest/service/management/tables/ACT_ID_MEMBERSHIP/data";
      var req = {
          method: 'GET',
          url: cloud,
          headers:{
            'Content-type':'application/json; charset=utf-8'
            //'Authorization' : 'Basic ' + Base64.encode('admin' + ':' + 'admin')
            }
        }
      $http(req).success(function(response) {
          console.log('HOla')
          console.log(response)
      }).catch(function(error){
          console.log(error)
      });




      // $http({method: 'GET', url: 'http://cloud.lucasianmexico.com:8585/activiti-rest/service/management/tables/ACT_ID_MEMBERSHIP/data',
      //       headers:{
      //         'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
      //         'Content-Type':' application/json',
              
      //         'X-Content-Type-Options': 'nosniff',
      //         'X-Frame-Options': 'DENY',
      //         'X-XSS-Protection': '1; mode=block'
      //       } }).
      //       success(function(data, status, headers, config) {
      //           console.log(data)
      //           // this callback will be called asynchronously
      //           // when the response is available
      //       }).
      //       error(function(data, status, headers, config) {
      //           console.log("error angular")
      //           console.log(data)
      //           console.log(status)
      //           console.log(headers)
      //           console.log(config)
      //           // called asynchronously if an error occurs
      //           // or server returns response with an error status.
      //       });

      }

      // $http.get('http://cloud.lucasianmexico.com:8585/activiti-rest/service/management/tables/ACT_ID_MEMBERSHIP/data')
      // .success(function(data){
      //   console.log(data)
      // }).catch(function(data){
      //   console.log(data)
      // });

      // $http.get('http://cloud.lucasianmexico.com:8585/activiti-rest/service/management/tables/ACT_ID_MEMBERSHIP/data')
      // .success(function(data){
      //   console.log(data)
      // }).catch(function(data){
      //   console.log(data)
      // });
      // $http.get('http://rest-service.guides.spring.io/greeting').
      //   success(function(data) {
      //      console.log(data)
      //   });


    /*FUNCTIONS STRUCTURES*/
      function startRevision(transactionId) {
        console.log("We are going to review the transaction");
        $state.go('home.statistics',{transactionId:transactionId});
      }

    

    


  }

})();
