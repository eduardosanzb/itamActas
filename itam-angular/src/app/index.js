// If this code works, it was written by Eduardo Sanchez (@eduardosanzb). If not, I don't know
// who wrote ir
'use strict';

angular.module('itamActas', ['ngAnimate', 'ngCookies', 'ngTouch',
  'ngSanitize', 'ui.router', 'ngMaterial', 'nvd3', 'app', 'md.data.table',
  'mdDataTable','chart.js','googlechart', 'ngResource'])
  
  //This is the Server to the REST stuff
  //.constant('ServerUrl', "http://cloud.lucasianmexico.com:8585")
  .constant('ServerUrl', "http://192.168.1.98:8585")
  .run(function($rootScope){
    //This Will keep a track of the previous state the app was. Need it for the navigation
    $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams){
      $rootScope.previousState = from;
    });
  })
 
  .config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider,
                    $mdIconProvider, ChartJsProvider, $httpProvider, $resourceProvider) {
    $stateProvider
      .state('login',{
        url: '/login',
          templateUrl: 'app/views/login.html',
          controller: 'LoginController',
          controllerAs:'vm',
          resolve:{
            //Will clean the scope each time the app is accessed 
            'clearScope':function($rootScope){
              localStorage.clear();
            }
          }
      })
      /* Common Resolve for all the states: 'auth'
      *   Will verify that there is a correct authentication in the app
      */
      .state('home', {
        url: '',
        templateUrl: 'app/views/main.html',
        controller: 'MainController',
        controllerAs: 'vm',
        abstract: true,
        resolve:{
          'auth': function($localStorage){
            if($localStorage.getObject('auth')){
              return true;
            } else {
              $state.go('login');
            }
          }
        }
      })
      .state('home.revision', {
        url: '/revision',
        templateUrl: 'app/views/revision.html',
        controller: 'RevisionController',
        controllerAs: 'vm',
        data: {
          title: 'Revision'
        },
        resolve:{
          'auth': function($localStorage){
            if($localStorage.getObject('auth')){
              return true;
            } else {
              $state.go('login');
            }
          }
        }
      })
      .state('home.statistics', {
        url: '/statistics/:transactionId',
        templateUrl: 'app/views/statistics.html',
        controller: 'StatisticsController',
        controllerAs: 'vm',
        data: {
          title: 'Statistics'
        },
        resolve:{
          'auth': function($localStorage){
            if($localStorage.getObject('auth')){
              return true;
            } else {
              $state.go('login');
            }
          }
        }
      })
      .state('home.transactions', {
        url: '/transactions',
        templateUrl: 'app/views/transactions.html',
        controller: 'TransactionsController',
        controllerAs: 'vm',
        data: {
        },
        resolve:{
          'auth': function($localStorage){
            if($localStorage.getObject('auth')){
              return true;
            } else {
              $state.go('login');
            }
          }
          
        }
      })
      .state('home.grading', {
        url: '/grading/:transactionId',
        templateUrl: 'app/views/partials/grading.html',
        controller: 'GradingController',
        controllerAs: 'vm',
        data: {
          title: 'Grading'
        },
        resolve:{
          'auth': function($localStorage){
            if($localStorage.getObject('auth')){
              return true;
            } else {
              $state.go('login');
            }
          }
        }
      })
      .state('home.admin', {
        url: '/admin',
        controller: 'AdminController',
        controllerAs: 'vm',
        templateUrl: 'app/views/admin.html',
        data: {
          title: 'Table Teacher'
        },
        resolve:{
          'auth': function($localStorage){
            if($localStorage.getObject('auth')){
              return true;
            } else {
              $state.go('login');
            }
          }
        }
      });
    $urlRouterProvider.otherwise('/login');


    // This is the configuration of the Angular Materials Colors
    //    Checkout the documentation in www.material.angularjs.com
    $mdThemingProvider
      .theme('default')
        .primaryPalette('grey', {
          'default': '600'
        })
        .accentPalette('teal', {
          'default': '500'
        })
        .warnPalette('defaultPrimary');

    $mdThemingProvider.theme('dark', 'default')
      .primaryPalette('defaultPrimary')
      .dark();

    $mdThemingProvider.theme('grey', 'default')
      .primaryPalette('grey');

    $mdThemingProvider.theme('custom', 'default')
      .primaryPalette('defaultPrimary', {
        'hue-1': '50'
    });
    $mdThemingProvider.theme('white', 'default')
      .primaryPalette('defaultPrimary', {
        'hue-1': '50'
    });

    $mdThemingProvider.definePalette('defaultPrimary', {
      '50':  '#FFFFFF',
      '100': 'rgb(255, 198, 197)',
      '200': '#096729',
      '300': '#096729',
      '400': '#096729',
      '500': '#096729',
      '600': '#096729',
      '700': '#096729',
      '800': '#096729',
      '900': '#096729',
      'A100': '#096729',
      'A200': '#096729',
      'A400': '#096729',
      'A700': '#096729'
    });

    $mdIconProvider.icon('user', 'assets/images/user.svg', 64);
  });
