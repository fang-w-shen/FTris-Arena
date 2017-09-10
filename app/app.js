'use strict';
angular.module('TetrisApp', ['ngRoute']);


angular.module('TetrisApp').config(function($routeProvider) {

  $routeProvider
    .when("/home", {
      templateUrl: "partials/home.html",
      controller: 'AuthCtrl'
    })
    .otherwise("/home");
});

angular.module('TetrisApp').run(function($rootScope, $window, firebaseInfo) {
  $rootScope.isLoggedIn = false;
  firebase.initializeApp(firebaseInfo);
  // firebase.auth().signOut();
  // firebase.auth().onAuthStateChanged(function(user) {
  //   if (user) {
  //     $rootScope.isLoggedIn = true;
  //   } else {
  //     $rootScope.isLoggedIn = false;
  //     $window.location.href = '#!/home';
  //   }
  // });
});
