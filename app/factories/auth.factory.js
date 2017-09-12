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
      },
      logInWithEmailAndPassword: function(credentials) {
        return firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
      },
      registerWithEmailAndPassword: function(credentials) {
        $(".progress").css("visibility","visible");
        return firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password);
      }

    };
  };

  AuthFactory.$inject = ['$http', '$rootScope'];
  angular.module('TetrisApp').factory('AuthFactory', AuthFactory);
})();
