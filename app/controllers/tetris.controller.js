(function() {
  'use strict';
  require('../tetris');
  require('../scoregrid');
  var TetrisCtrl = function($rootScope, $scope, AuthFactory, $location, $route, FirebaseFactory) {
      //////////////WINDOW INITIALIZATION/////////////
      var yourDeviceWidth = window.matchMedia( "(max-width: 570px)" );
      if (yourDeviceWidth.matches) {
          // window width is at less than 500px
          $('body').css("overflow-y","scroll");
      }
      else {
          $('body').css("overflow-y","hidden");
      }

      $(".dropdown-button").dropdown();
      $(".button-collapse").sideNav();
      $("#sidenav-overlay").css("display",'none');
      //////////////VARIABLE DECLARATIONS////////////
      $scope.userCredentials = {};
      $scope.logInGoogle = logInGoogle;
      $scope.logOutUser = logOutUser;
      $scope.registerWithEmailAndPassword = registerWithEmailAndPassword;
      $scope.logInWithEmailAndPassword = logInWithEmailAndPassword;
      $scope.isLoggedIn = firebase.auth().currentUser;
      $scope.fullScreen = false;
      //////////////AUTHORIZATION METHODS//////////////////////
      function logInGoogle() {
        AuthFactory.logInGoogle()
            .then(response => {
                let user = response.user.uid;
                // $(".progress").css("visibility","hidden");
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
    //////////////INITIALIZING GAME//////////////////////
    function initializeGame() {
      var tetris = new Tetris({
          rows: 20,
          cols: 10,
          gamePlaceholder: '#tetris',
          previewPlaceholder: '#preview',
          difficulty:"easy"
        });
      function exitFullScreen(element) {
                if(element.exitFullscreen) {
                  element.exitFullscreen();
                } else if(element.mozCancelFullScreen) {
                  element.mozCancelFullScreen();
                } else if(element.webkitExitFullscreen) {
                  element.webkitExitFullscreen();
                }
              }
      function launchFullScreen(element) {
                if(element.requestFullScreen) {
                  element.requestFullScreen();
                } else if(element.mozRequestFullScreen) {
                  element.mozRequestFullScreen();
                } else if(element.webkitRequestFullScreen) {
                  element.webkitRequestFullScreen();
                }
              }
      function bindFullScreenKey() {
          $(document).on("keyup",(e)=>{
            if (e.keyCode === 70) {
                  if(!$scope.fullScreen){
                    launchFullScreen(document.getElementById("mobileDevice")); // the whole page
                    $scope.fullScreen = true;
                    $scope.$apply();
                  }else {
                    exitFullScreen(document); // the whole page
                    $scope.fullScreen = false;

                  }
            }

          });
        }
        bindFullScreenKey();
        // tetris.init();
        // tetris.grid.getCellAt(2,0).$el.css('background','red');


          $("#startGame").on("click",()=>{
            $(document).off("keydown");
              // Launch fullscreen for browsers that support it!
              launchFullScreen(document.getElementById("mobileDevice")); // the whole page
              tetris.init();
              $(document).on("keyup",(e)=>{
                if(e.keyCode === 82) { //R Restart KEY
                 $(window).off("keydown");
                  console.log("trying to restart game");
                  tetris.endGame();
                  $route.reload();
                }
              });
            $('#menu-select').on("click",()=>{
              /////restart
              tetris.endGame();
              $route.reload();
            });



          });



          $(document).on("keydown",(e)=>{

            switch(e.keyCode) {
              case 13:
                $(document).off("keydown");
                tetris.init();
                $(document).on("keyup",(e)=>{
                    if(e.keyCode === 82) { //R Restart Key
                      $(document).off("keydown");
                      $route.reload();
                      console.log("trying to restart game");
                    }
                  });
                break;

              }
            });





      $("#endGame").on("click",()=>{
        tetris.endGame();
        $location.url("/home");
        $route.reload();
      });
      //////////////EVENT LISTENTER TO EXIT TO HOME///////////////////
      $(document).on("keyup",(e)=>{
        switch(e.keyCode) {
          case 27: /// ESC KEY
            tetris.endGame();
            // $(document).off("keyup");
            // $(document).off("keydown");
            $location.url('/home');

            $('*').css("overflow","hidden !important");
            $route.reload();
            break;
        }

      });


      }

        if($location.url()==="/Tetris"){
          $("#pauseGame").css("visibility","hidden");
          initializeGame();
        }

        function getLowestHighScore() {
          console.log("whats the third highest score",FirebaseFactory.getLowestHighScore());
        }

        getLowestHighScore();

      // $(window).on("click",()=>{
      //   $(".drag-target").css("display",'none');
      //   $("#sidenav-overlay").css("z-index",'-1');
      //   $("#sidenav-overlay").css("display",'none');
      // });

  };

  TetrisCtrl.$inject = ['$rootScope', '$scope', 'AuthFactory','$location','$route',"FirebaseFactory"];
  angular.module('TetrisApp').controller('TetrisCtrl', TetrisCtrl);
})();
