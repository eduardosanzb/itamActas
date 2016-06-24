'use strict';

angular.module('itamActas', ['ngAnimate', 'ngCookies', 'ngTouch',
  'ngSanitize', 'ui.router', 'ngMaterial', 'nvd3', 'app', 'md.data.table','mdDataTable'])

  .config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider,
                    $mdIconProvider) {
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
      .state('home.dashboard', {
        url: '/dashboard',
        templateUrl: 'app/views/dashboard.html',
        data: {
          title: 'Dashboard'
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
      .state('home.table', {
        url: '/table',
        controller: 'TableController',
        controllerAs: 'vm',
        templateUrl: 'app/views/table.html',
        data: {
          title: 'Table'
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
