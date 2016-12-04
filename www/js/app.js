// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionic-material','ion-floating-menu','firebase','ionMdInput','ionic-modal-select'])

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
      controller: 'loginCtrl'
    })

    .state('home', {
      url: '/Home',
      abstract : true,
      controller: 'HomeCtrl',
      templateUrl: 'templates/menu.html',

      })

    .state('home.chkayet', {
      url: '/chkayet',
      views: {
        'snd': {
          templateUrl: 'templates/chkayet.html',
          controller: 'HomeCtrl'
        }
      }



    })

    .state('home.dalilek', {
      url: '/dliled',
      views: {
        'snd': {
          controller: 'dalilekCtrl',
          templateUrl: 'templates/dalilek.html',
        }
      }


    })

    .state('home.profilek', {
      url: '/profilek',
      views: {
        'snd': {
          controller: 'ProfilekCtrl',
          templateUrl: 'templates/profilek.html',
        }
      }


    })


    .state('home.nouweb', {
      url: '/Nouweb',
      views: {
        'snd': {
          controller: 'NouwebCtrl',
          templateUrl: 'templates/nouweb.html',
        }
      }


    })

    .state('home.creerReclamation', {
      url: '/Reclamation',
      views: {
        'snd': {
          controller: 'ReclamationCtrl',
          templateUrl: 'templates/Creer_Reclamation.html',
        }
      }



    })

    .state('home.contactUs', {
      url: '/ContactUs',
      views: {
        'snd': {
          controller: 'ContactCtrl',
          templateUrl: 'templates/ContactUs.html',
        }
      }



    })















    // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
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


      /*getUserByuid : function(uid){
        /*var users = $firebaseArray(ref);

         console.log('result1', users.$indexFor("ahmed.bouhmid94@gmail.com"))
         console.log('user1 ',users.$getRecord("Ahmed Rebai"));*/

        /*users.$loaded().then(function(users) {
          console.log('users are', JSON.stringify(users));
          console.log('user ',users.$getRecord(uid));
          return users.$getRecord(uid);
        })

        return users.$getRecord(uid);

      }*/

       newUserRef : function(user) {
      var ref = new Firebase("https://statusapp.firebaseio.com/users/" + user.uid);
      return $firebaseObject(ref);
    },

     getUserData : function(user) {
      var ref = new Firebase("https://statusapp.firebaseio.com/users/" + user);
      return $firebaseObject(ref);
    },

    getLoggedInUser : function() {
      var user = localStorage.getItem('firebase:session::statusapp');
      if(user) {
        return JSON.parse(user);
      }
    },


      CreateReclamation : function(reclamation){

        var ref = firebase.database().ref().child("Reclamations");
        // create a synchronized array
        $scope.reclamations = $firebaseArray(ref);
        $scope.reclamations.$add(reclamation);

      }

    };





    return Users;

  }])

  .controller('HomeCtrl', function($scope, $ionicModal, $timeout) {

console.log('we are here !!!!!');
  })


.controller('loginCtrl', function($scope, $stateParams,Auth,$state) {
    console.log('hamodlha login');



    //les donneé pour les gouvernorat **********************//

    $scope.selectables = [
      { name: "Tunis"},
      { name: "Bizerte"},

    ];




    $scope.User = {};

console.log('the auth', Auth);

    $scope.submitted = false ;





    $scope.login = function(isvalid)
    {


      $scope.submitted = true ;


      //if(isvalid)
      //{
        /*Auth.$signInWithEmailAndPassword({
          email: $scope.User.email,
          password: $scope.User.password
        })
          .then(function(authData) {
            console.log('Logged in as:', authData.uid);
            //$state.go('profile');
            $state.go('home.chkayet')
          })
          .catch(function(err) {
            console.log('error:',err);
            $scope.shwoError = true;
            //$state.go('login');
          });*/
      $state.go('home.chkayet');
      //}


    }






    //******************************************************//
$scope.newUser = {};
    $scope.showErrorRegister = false ;
    $scope.submitted2 = false ;

    $scope.Register = function(isValid){
      //create a New User
      $scope.submitted2 = true ;

      if(isValid) {

        Auth.$createUserWithEmailAndPassword({
          username: $scope.newUser.username,
          email: $scope.newUser.email,
          password: $scope.newUser.password
        })
          .then(function (userDate) {
            //call the login method

            $scope.login($scope.newUser.email, $scope.newUser.password);

          }).catch(function (err) {
            $scope.error = err;
          })
      }//end if isvalid
    }





})

//ProfilekCtrl
  .controller('ProfilekCtrl', function($scope, $stateParams) {
  })

//NouwebCtrl

  .controller('NouwebCtrl', function($scope, $stateParams) {
  })

  .controller('ContactCtrl', function($scope, $stateParams) {
  })


  .controller('dalilekCtrl', function($scope, $stateParams) {
  })

  .run(["$rootScope", "$state", function($rootScope, $state) {
    $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
      // We can catch the error thrown when the $requireSignIn promise is rejected
      // and redirect the user back to the home page
      if (error === "AUTH_REQUIRED") {
        $state.go("login");
      }
    });
  }]);
