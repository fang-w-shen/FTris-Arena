(function() {
  'use strict';

  var AuthCtrl = function($rootScope, $scope, AuthFactory) {
    $('.overlay').fadeIn(2000);
  };

  AuthCtrl.$inject = ['$rootScope', '$scope', 'AuthFactory'];
  angular.module('TetrisApp').controller('AuthCtrl', AuthCtrl);
})();
