(function(){

  angular
    .module('app')
    .controller('LoginController', 
      ['$state', '$rootScope','loginService', 'groupService','$mdToast', '$localStorage',
      LoginController]);

  function LoginController($state, $rootScope, loginService, groupService, $mdToast, $localStorage) {
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
          // We save the name of the user for laters
          $localStorage.set('name', userData.firstName + " " +userData.lastName);
          //We have the data of the user, now we have to identify
          // which groups he is part of.
          groupService.get().$promise.then(function(groups){
            //We save the credentials for the http authentication
            $localStorage.setObject('auth',vm.credentials);
            var roles = [];
            groups.data.forEach( function(member) {
              //We push each group the user is in
              if(userData.id === member.USER_ID_){
                roles.push(member.GROUP_ID_);
                $localStorage.setObject('groups', roles);
              } 
            });
            //Redirection to the proper state depending which group the user is part of.
            if($localStorage.getObject('groups')){
              if($localStorage.getObject('groups').indexOf("jefesDepartamentos")==0 || $localStorage.getObject('groups').indexOf("direccion")==0)
              $state.go('home.revision');
              if($localStorage.getObject('groups').indexOf("admin")==0)
                $state.go('home.admin');
              if($localStorage.getObject('groups').indexOf("profesores")==0)
                $state.go('home.transactions');
            } else {
              $mdToast.show(
                $mdToast.simple()
                  .content("No Perteneces a ningun grupo")
                  .hideDelay(2000)
                  .position('Habla con tu Administrador')
              );
            } // if - else
              
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
