'use strict';
angular.module('TetrisApp', ['ngRoute']);


angular.module('TetrisApp').config(function($routeProvider) {
  // let isAuth = ($location) => {
  //       return new Promise((resolve,reject)=>{
  //           let truth = firebase.auth().currentUser.uid;
  //           if (truth){
  //               resolve();
  //           } else {

  //             $location.url("/home");

  //           }
  //       });
  //   };

  $routeProvider
    .when("/home", {
      templateUrl: "partials/home.html",
      controller: 'HomeCtrl'
    }).when("/Tetris", {
      templateUrl: "partials/tetris.html",
      controller: 'TetrisCtrl'
    }).when("/Tetris1v1", {
      templateUrl: "partials/tetris1v1.html",
      controller: 'Tetris1v1Ctrl'
      // resolve: {isAuth}
    }).when("/register", {
      templateUrl: "partials/register.html",
      controller: 'Tetris1v1Ctrl'
    }).when("/login", {
      templateUrl: "partials/login.html",
      controller: 'Tetris1v1Ctrl'
    })
    .otherwise("/login");
});

angular.module('TetrisApp').run(function($rootScope, $window, firebaseInfo) {

  firebase.initializeApp(firebaseInfo);
  // firebase.auth().signOut();

});
