// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionic-material','ion-floating-menu','firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider



    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'

    })

    .state('register', {
          url: '/Register',
      templateUrl: 'templates/Register.html',
      controller: 'RegisterCtrl'
    })

    .state('home', {
      url: '/Home',
      abstract : true,
      controller: 'HomeCtrl',
      templateUrl: 'templates/menu.html',

      })

    .state('home.chkayet', {
      url: '/chkayet',
      controller: 'HomeCtrl',
      templateUrl: 'templates/chkayet.html',

    })

    .state('home.dalilek', {
      url: '/dliled',
      controller: 'daliledCtrl',
      templateUrl: 'templates/dalilek.html',

    })

    .state('home.profilek', {
      url: '/profilek',
      controller: 'ProfilekCtrl',
      templateUrl: 'templates/profilek.html',

    })


    .state('home.nouweb', {
      url: '/Nouweb',
      controller: 'NouwebCtrl',
      templateUrl: 'templates/nouweb.html',

    })

    .state('home.creerReclamation', {
      url: '/Reclamation',
      controller: 'ReclamationCtrl',
      templateUrl: 'templates/Creer_Reclamation.html',

    })














    // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home/chkayet');
})
  .constant('FURL', {
    apiKey: "AIzaSyBauFhF-qrVRaIWZ3h3kDqPtp_K8h5YR9Y",
    authDomain: "reclami-5c6cb.firebaseapp.com",
    databaseURL: "https://reclami-5c6cb.firebaseio.com",
    storageBucket: "reclami-5c6cb.appspot.com",
    messagingSenderId: "94793782076"
  }
)

  .factory('Auth',['$firebaseAuth', function($firebaseAuth) {
    return $firebaseAuth();
  }])

  .factory('UserService',['$http','$firebaseObject','$firebaseArray','Auth', function($http,$firebaseObject,$firebaseArray,Auth){


    //*******Configute the listf os Users **********************//

    var ref = firebase.database().ref().child("Users");


    // create a synchronized array
    var users = $firebaseArray(ref);
    //var list = $firebase(ref.child('Users')).$asArray();


    var Users = {


      getUserByuid : function(uid){
        /*var users = $firebaseArray(ref);

         console.log('result1', users.$indexFor("ahmed.bouhmid94@gmail.com"))
         console.log('user1 ',users.$getRecord("Ahmed Rebai"));*/

        users.$loaded().then(function(users) {
          console.log('users are', JSON.stringify(users));
          console.log('user ',users.$getRecord(uid));
          return users.$getRecord(uid);
        })

        return users.$getRecord(uid);

      }

    };





    return Users;

  }])

  .controller('HomeCtrl', function($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    console.log('we are here hey niggah my niggah !');

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function() {
        $scope.closeLogin();
      }, 1000);
    };
  })


.controller('loginCtrl', function($scope, $stateParams) {
    console.log('hamodlha login');
})
  .controller('RegisterCtrl', function($scope, $stateParams) {
})
//ProfilekCtrl
  .controller('ProfilekCtrl', function($scope, $stateParams) {
  })

//NouwebCtrl

  .controller('NouwebCtrl', function($scope, $stateParams) {
  })
