(function(){

  angular
    .module('app')
    .controller('LoginController', 
      ['$state', 
      LoginController]);

  function LoginController($state) {
    var vm = this;
    vm.credentials = {};
    vm.login = login;

    vm.imagePath = 'assets/images/itam.jpg';


    function login(){
      console.log(vm.credentials);
      /* TODO 
       *  1. Verify if there is a session already
       *  2. Make all the backend connection
       */
      $state.go('home.dashboard');
    }


  }

})();
