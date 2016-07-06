(function(){

  angular
       .module('app')
       .controller('MainController', [
          'navService', '$mdSidenav', '$mdBottomSheet', 
          '$log', '$q', '$state', '$mdToast','$mdMedia',
          '$rootScope', '$localStorage',
          MainController
       ]);

  function MainController(navService, $mdSidenav, $mdBottomSheet,
                          $log, $q, $state, $mdToast, $mdMedia,
                          $rootScope, $localStorage) {
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

    vm.menuItems = [ ];
    vm.selectItem = selectItem;
    vm.toggleItemsList = toggleItemsList;
    vm.toggleItemsList2 = toggleItemsList2;
    vm.showActions = showActions;
    vm.title = $state.current.data.title;
    vm.showSimpleToast = showSimpleToast;
    vm.toggleRightSidebar = toggleRightSidebar;
    vm.$mdMedia = $mdMedia;
    vm.logo = 'assets/images/itamtransparente.png'
    vm.name = $localStorage.get('name');

    navService
      .loadAllItems()
      .then(function(menuItems) {
        menuItems.forEach( function(group) {
        $localStorage.getObject('groups').forEach( function(role) {
          if(group[role]){
            vm.menuItems.push(group);
          }
        });
        });
      });

    function toggleRightSidebar() {
        $mdSidenav('right').toggle();
    }

    function toggleItemsList() {
      var pending = $mdBottomSheet.hide() || $q.when(true);

      pending.then(function(){
        $mdSidenav('left').toggle();
      });
    }
    function toggleItemsList2() {
        $mdSidenav('left').toggle();
    }


    function selectItem (item) {
      vm.title = item.name;
      vm.toggleItemsList();
      vm.showSimpleToast(vm.title);
    }

    function showActions($event) {
        $mdBottomSheet.show({
          parent: angular.element(document.getElementById('content')),
          templateUrl: 'app/views/partials/bottomSheet.html',
          controller: [ '$mdBottomSheet', SheetController],
          controllerAs: "vm",
          bindToController : true,
          targetEvent: $event
        }).then(function(clickedItem) {
          clickedItem && $log.debug( clickedItem.name + ' clicked!');
        });

        function SheetController( $mdBottomSheet ) {
          var vm = this;

          vm.actions = [
            { name: 'Share', icon: 'share', url: 'https://twitter.com/intent/tweet?text=Angular%20Material%20Dashboard%20https://github.com/flatlogic/angular-material-dashboard%20via%20@flatlogicinc' },
            { name: 'Star', icon: 'star', url: 'https://github.com/flatlogic/angular-material-dashboard/stargazers' }
          ];

          vm.performAction = function(action) {
            $mdBottomSheet.hide(action);
          };
        }
    }

    function showSimpleToast(title) {
      $mdToast.show(
        $mdToast.simple()
          .content(title)
          .hideDelay(2000)
          .position('bottom right')
      );
    }
  }

})();
