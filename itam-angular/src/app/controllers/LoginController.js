(function(){

  angular
    .module('app')
    .controller('LoginController', 
      ['$state', 
      LoginController]);

  function LoginController($state) {
    /*  COMPLETETemplate:   app/views/transactions.html
     *  $state:     home.transactions
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
    vm.credentials = {};
    vm.login = login;

    vm.imagePath = 'assets/images/itam.jpg';


    function login(){
      console.log(vm.credentials);
      /* TODO 
       *  1. Verify if there is a session already
       *  2. Make all the backend connection
       *  3. Go to proper state depending the role
       */
      $state.go('home.revision');
    }


  }

})();
