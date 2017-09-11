'use strict';
angular.module('TetrisApp', ['ngRoute']);


angular.module('TetrisApp').config(function($routeProvider) {
  $routeProvider
    .when("/home", {
      templateUrl: "partials/home.html",
      controller: 'HomeCtrl'
    }).when("/Tetris", {
      templateUrl: "partials/tetris.html",
      controller: 'AuthCtrl'
    }).when("/register", {
      templateUrl: "partials/register.html",
      controller: 'AuthCtrl'
    }).when("/login", {
      templateUrl: "partials/login.html",
      controller: 'AuthCtrl'
    })
    .otherwise("/home");
});

angular.module('TetrisApp').run(function($rootScope, $window, firebaseInfo) {

  firebase.initializeApp(firebaseInfo);
  firebase.auth().signOut();
});
