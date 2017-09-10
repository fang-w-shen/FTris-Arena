(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
(function() {
  'use strict';

  var AuthCtrl = function($rootScope, $scope, AuthFactory) {
    $('.overlay').fadeIn(2000);
  };

  AuthCtrl.$inject = ['$rootScope', '$scope', 'AuthFactory'];
  angular.module('TetrisApp').controller('AuthCtrl', AuthCtrl);
})();

},{}],3:[function(require,module,exports){
(function() {
  'use strict';

  var AuthFactory = function($http, $rootScope) {
    $rootScope.currentUser = firebase.auth().currentUser;
    return {
      loginWithGoogle: function() {
        let google = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(google);
      },
      logout: function() {
        return firebase.auth().signOut();
      },
      getUser: function() {
        return $rootScope.currentUser;
      }
    };
  };

  AuthFactory.$inject = ['$http', '$rootScope'];
  angular.module('TetrisApp').factory('AuthFactory', AuthFactory);
})();

},{}],4:[function(require,module,exports){
angular.module('TetrisApp').constant("firebaseInfo", {
    apiKey: "AIzaSyBNq9eV8vzdFJwUlxCzeAh3wsC5apGsdjY",
    authDomain: "tetris-arena.firebaseapp.com",
    databaseURL: "https://tetris-arena.firebaseio.com",
    projectId: "tetris-arena",
    storageBucket: "tetris-arena.appspot.com",
    messagingSenderId: "735100394750"
});
},{}]},{},[1,2,3,4]);
