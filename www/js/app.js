// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var db = null;
var db1 = null;
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

  .run(function ($ionicPlatform, $cordovaSQLite) {
    $ionicPlatform.ready(function () {

      document.addEventListener('deviceready', function () {
        window.sqlitePlugin.echoTest(function () {
          console.log('ECHO test OK');
        });
      });
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }

      if (window.cordova && ionic.Platform.isAndroid()) {
        db1 = window.sqlitePlugin.openDatabase({ name: 'log.db', location: 'default' });
        createTable();
      } else if (ionic.Platform.isAndroid()){
        db1 = window.sqlitePlugin.openDatabase({name: 'log.db', iosDatabaseLocation: 'Library'});
        createTable();
      }


      function createTable(){
        $cordovaSQLite.execute(db1, "CREATE TABLE IF NOT EXISTS things (id integer PRIMARY KEY ASC, date text, smallAmount int, bigAmount int, eaten int, timeStarted text, timeEnded text, ableToDrive int, timeSleep text, goodSleep int)");      
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      // Each tab has its own nav history stack:

      .state('tab.dash', {
        url: '/dash',
        views: {
          'tab-dash': {
            templateUrl: 'templates/tab-dash.html',
            controller: 'DashCtrl'
          }
        }
      })
      .state('tab.history', {
        url: '/history',
        views: {
          'tab-history': {
            templateUrl: 'templates/history.html',
            controller: 'historyController'
          }
        }
      })

      .state('tab.chats', {
        url: '/chats',
        views: {
          'tab-chats': {
            templateUrl: 'templates/tab-chats.html',
            controller: 'ChatsCtrl'
          }
        }
      })
      .state('tab.chat-detail', {
        url: '/chats/:chatId',
        views: {
          'tab-chats': {
            templateUrl: 'templates/chat-detail.html',
            controller: 'ChatDetailCtrl'
          }
        }
      })

      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/dash');

  });
