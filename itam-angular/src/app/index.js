'use strict';

angular.module('itamActas', ['ngAnimate', 'ngCookies', 'ngTouch',
  'ngSanitize', 'ui.router', 'ngMaterial', 'nvd3', 'app', 'md.data.table',
  'mdDataTable','chart.js','googlechart'])

  .run(function($rootScope){
    $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams){
      $rootScope.previousState = from;
      //console.log(from);
    });
  })
 

  .config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider,
                    $mdIconProvider, ChartJsProvider, $httpProvider) {

     //$httpProvider.defaults.withCredentials = true;
     // $httpProvider.defaults.useXDomain = true;
     // delete $httpProvider.defaults.headers.common['X-Requested-With'];
    
    ChartJsProvider.setOptions({ colors : [ '#096729', '#096729', '#096729', '#46B096729FBD', '#096729', '#096729', '#096729'] });
    $stateProvider
      .state('login',{
        url: '/login',
          templateUrl: 'app/views/login.html',
          controller: 'LoginController',
          controllerAs:'vm',
          resolve:{}
      })
      .state('home', {
        url: '',
        templateUrl: 'app/views/main.html',
        controller: 'MainController',
        controllerAs: 'vm',
        abstract: true
      })
      .state('home.revision', {
        url: '/revision',
        templateUrl: 'app/views/revision.html',
        controller: 'RevisionController',
        controllerAs: 'vm',
        data: {
          title: 'Revision'
        }
      })
      .state('home.statistics', {
        url: '/statistics/:transactionId',
        templateUrl: 'app/views/statistics.html',
        controller: 'StatisticsController',
        controllerAs: 'vm',
        data: {
          title: 'Statistics'
        }
      })
      .state('home.transactions', {
        url: '/transactions',
        templateUrl: 'app/views/transactions.html',
        controller: 'TransactionsController',
        controllerAs: 'vm',
        data: {
          title: 'transactions'
        }
      })
      .state('home.grading', {
        url: '/grading/:transactionId',
        templateUrl: 'app/views/partials/grading.html',
        controller: 'GradingController',
        controllerAs: 'vm',
        data: {
          title: 'Grading'
        }
      })
      .state('home.teacher', {
        url: '/teacher',
        controller: 'TeacherController',
        controllerAs: 'vm',
        templateUrl: 'app/views/table-teacher.html',
        data: {
          title: 'Table Teacher'
        }
      });

    $urlRouterProvider.otherwise('/login');

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
