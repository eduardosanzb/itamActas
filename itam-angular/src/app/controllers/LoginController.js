(function(){

  angular
    .module('app')
    .controller('LoginController', 
      ['$state', '$rootScope','loginService', 'groupService','$mdToast',
      LoginController]);

  function LoginController($state, $rootScope, loginService, groupService, $mdToast) {
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
      /* TODO 
       *  1. Verify if there is a session already
       *  2. Make all the backend connection
       *  3. Go to proper state depending the role
       */
       loginService.auth(vm.credentials)
       .$promise.then(function(userData){
        console.log(userData)
        $rootScope.userName = userData.firstName + " " +userData.lastName;
        //We have the data of the user, now we have to identify
        // which groups he is part of.
        groupService.get().$promise.then(function(groups){
          $rootScope.auth = vm.credentials;
            groups.data.forEach( function(member) {
              if(userData.id === member.USER_ID_){
                if(!$rootScope.groups)
                  $rootScope.groups = []
                $rootScope.groups.push(member.GROUP_ID_);
              } 
            });
            if($rootScope.groups.indexOf("jefesDepartamentos")==0 || $rootScope.groups.indexOf("direccion")==0)
              $state.go('home.revision');
            if($rootScope.groups.indexOf("admin")==0)
              $state.go('home.admin');
            if($rootScope.groups.indexOf("profesores")==0)
              $state.go('home.transactions');
        });
      }).catch(function(error){
        console.log("Credetials incorrect")
        $mdToast.show(
        $mdToast.simple()
          .content("Credenciales Incorrectas")
          .hideDelay(2000)
          .position('El usuario y/o contraseña no son correctos')
      );
      });
    }


  }

})();
