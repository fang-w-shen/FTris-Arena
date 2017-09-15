'use strict';
angular.module('TetrisApp', ['ngRoute']);


angular.module('TetrisApp').config(function($routeProvider) {
  $routeProvider
    .when("/home", {
      templateUrl: "partials/home.html",
      controller: 'HomeCtrl'
    }).when("/Tetris", {
      templateUrl: "partials/tetris.html",
      controller: 'TetrisCtrl'
    }).when("/register", {
      templateUrl: "partials/register.html",
      controller: 'TetrisCtrl'
    }).when("/login", {
      templateUrl: "partials/login.html",
      controller: 'TetrisCtrl'
    })
    .otherwise("/home");
});

angular.module('TetrisApp').run(function($rootScope, $window, firebaseInfo) {

  firebase.initializeApp(firebaseInfo);
  firebase.auth().signOut();
});
