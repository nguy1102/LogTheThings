angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope, $cordovaSQLite) {
    $scope.logObject = {
      date: new Date(),
      smallAmount: 0,
      bigAmount: 0,
      eaten: true,
      timeStarted: null,
      timeEnded: null,
      ableToDrive: true,
      timeSleep: null,
      goodSleep: true
    }

    $scope.submit = function (submittedObject) {
      submittedObject.date = new Date(submittedObject.date).toLocaleDateString();
      submittedObject.timeStarted = new Date(submittedObject.timeStarted).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      submittedObject.timeEnded = new Date(submittedObject.timeEnded).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      submittedObject.timeSleep = new Date(submittedObject.timeSleep).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      db1.transaction(function (tx) {
        tx.executeSql('INSERT INTO things (date, smallAmount, bigAmount, eaten, timeStarted, timeEnded, ableToDrive, timeSleep, goodSleep) VALUES (?,?,?,?,?,?,?,?,?)',
          [submittedObject.date, submittedObject.smallAmount, submittedObject.bigAmount, submittedObject.eaten, submittedObject.timeStarted
            , submittedObject.timeEnded, submittedObject.ableToDrive, submittedObject.timeSleep, submittedObject.goodSleep]);
      }, function (error) {
        console.log('Transaction ERROR: ' + error.message);
      }, function () {
        console.log('Populated database OK');
      });
    }

  })

  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  })

  .controller('historyController', function ($scope, dataBaseService) {
    $scope.logHistory = [];
    $scope.driving = true;

    $scope.refresh = function () {
      dataBaseService.getHistory().then(function (data) {
        // data or false
        for(var i = 0; i < data.length; i++){
          // $scope.logHistory.push(JSON.stringify(data.item(i)))
          $scope.logHistory.push(data.item(i));

        }
        console.log('stringify', $scope.logHistory );

    }, function (err) {
        // if failing
        console.log(err)
    });
    }

    $scope.refresh();


  })
  ;
