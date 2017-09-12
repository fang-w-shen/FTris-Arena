(function() {
  'use strict';
  require('../tetris');
  require('../scoregrid');
  var AuthCtrl = function($rootScope, $scope, AuthFactory, $location) {
    $scope.userCredentials = {};
    $scope.logInGoogle = logInGoogle;
    $scope.logOutUser = logOutUser;
    $scope.registerWithEmailAndPassword = registerWithEmailAndPassword;
    $scope.logInWithEmailAndPassword = logInWithEmailAndPassword;
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
              // Find the right method, call on correct element
function launchFullScreen(element) {
  if(element.requestFullScreen) {
    element.requestFullScreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  }
}

// Launch fullscreen for browsers that support it!
launchFullScreen(document.getElementById("tetris")); // the whole page
            tetris.init();
          });
          $("#endGame").on("click",()=>{
            tetris.endGame();
            $("#tetris").html(' ');
            $("#preview").html(' ');
            tetris.render();

          });
      }
      initializeGame();
      //////////////AUTHORIZATION METHODS//////////////////////
      function logInGoogle() {
        AuthFactory.logInGoogle()
            .then(response => {
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

      function registerWithEmailAndPassword(userCredentials) {
        AuthFactory.registerWithEmailAndPassword(userCredentials).then(response=>{
            console.log("response from register", response);
            $scope.logInWithEmailAndPassword(userCredentials);
        });
      }


      function logInWithEmailAndPassword(userCredentials){
        AuthFactory.logInWithEmailAndPassword(userCredentials).then(function(response){
          console.log("response from sign in", response);

          $location.path("/Tetris");
          $scope.$apply();
        });
      }


  };

  AuthCtrl.$inject = ['$rootScope', '$scope', 'AuthFactory','$location'];
  angular.module('TetrisApp').controller('AuthCtrl', AuthCtrl);
})();
