(function() {
  'use strict';
  require('../tetris');
  require('../scoregrid');
  var AuthCtrl = function($rootScope, $scope, AuthFactory, $location) {
    $scope.logInGoogle = logInGoogle;
    $scope.logOutUser = logOutUser;
    $scope.isLoggedIn = firebase.auth().currentUser;
    //////////////INITIALIZING GAME//////////////////////
    function initializeGame() {
      var tetris = new Tetris({
          rows: 20,
          cols: 10,
          gamePlaceholder: '#tetris',
          previewPlaceholder: '#preview',
          currentShapePlaceholder: '#currentshape',
          difficulty:"easy"
        });
        // tetris.init();
        // tetris.grid.getCellAt(2,0).$el.css('background','red');
          $("#startGame").on("click",()=>{
            tetris.init();
          });
      }
      initializeGame();

      function logInGoogle() {
        AuthFactory.logInGoogle()
            .then(result => {
                let user = result.user.uid;
                $(".progress").css("visibility","hidden");
                $scope.isLoggedIn = true;
                $location.url('/Tetris');
                $scope.$apply();
            })
            .catch(error => console.log("google login error", error.message, error.code));
      }

      function logOutUser() {
        AuthFactory.logOut();
        $scope.isLoggedIn = false;
        $location.url('/home');
      }






  };

  AuthCtrl.$inject = ['$rootScope', '$scope', 'AuthFactory','$location'];
  angular.module('TetrisApp').controller('AuthCtrl', AuthCtrl);
})();
