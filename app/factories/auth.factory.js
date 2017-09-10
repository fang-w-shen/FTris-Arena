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
