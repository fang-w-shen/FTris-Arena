(function() {
  'use strict';

  var AuthFactory = function($http, $rootScope) {
    let user = firebase.auth().currentUser;
    return {
      logInGoogle: function() {
        let google = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(google);
      },
      logOut: function() {
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
