(function() {
  'use strict';
  require('../tetris');
  require('../scoregrid');
  var Tetris1v1Ctrl = function($rootScope, $scope, AuthFactory, $location, $route, FirebaseFactory) {
    var themesong = document.getElementById("myAudio");
    themesong.currentTime = 0;
    $("#pauseGame").css("visibility","hidden");

    ///////////////////////////////////SETTING UP GAME LOBBY//////////////////////////////////////////////////
    if (firebase.auth().currentUser) {
      var ref = firebase.database().ref(`users/${firebase.auth().currentUser.uid}`);
      ref.update({
       onlineState: true,
       status: "I'm online.",
       user: firebase.auth().currentUser.uid
       });
       ref.onDisconnect().update({
        onlineState: false,
        status: "I'm offline."
      });

    }

  FirebaseFactory.getGameBoards().then((items)=>{


    if(items){
      let keys = Object.keys(items);
      let values = Object.values(items);
      console.log("item is", values);

      $scope.board = values;
      $scope.$apply();
    } else {
      $scope.board = '';
      $scope.$apply();
    }
  });
  let gamesref = firebase.database().ref('games');
  gamesref.on("value",(snapshot)=>{
    if(snapshot.val()){
     let values= Object.values(snapshot.val());
     $scope.board = values;
     $scope.$apply();
   }else {
      $scope.board = '';
      $scope.$apply();
    }

 });


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
      $scope.gameCredentials = {};
      $scope.logInGoogle = logInGoogle;
      $scope.logOutUser = logOutUser;
      $scope.registerWithEmailAndPassword = registerWithEmailAndPassword;
      $scope.logInWithEmailAndPassword = logInWithEmailAndPassword;
      $scope.isLoggedIn = firebase.auth().currentUser;
      $scope.fullScreen = false;
      $scope.initializeGame = initializeGame;
      $scope.gameMade = false;
      $scope.board = {};
            //////////////AUTHORIZATION METHODS//////////////////////
            function logInGoogle() {
              AuthFactory.logInGoogle()
              .then(response => {
                let user = response.user.uid;
                // $(".progress").css("visibility","hidden");
                $scope.isLoggedIn = true;
                $location.path("/Tetris1v1");
                $route.reload();
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

                $location.path("/Tetris1v1");
                $route.reload();
              });
            }
      //////////////INITIALIZING GAME//////////////////////
      function initializeGame(gameCredentials) {
        $scope.gameMade = true;
        var tetris = new Tetris2({
          rows: 20,
          cols: 10,
          gamePlaceholder: '#tetris',
          previewPlaceholder: '#preview',
          opponentPlaceholder: '#tetris2',
          difficulty:"easy",
          gameBoardRef: gameCredentials
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

        // tetris.init();
        // tetris.grid.getCellAt(2,0).$el.css('background','red');


        $("#startGame").on("click",()=>{
          bindFullScreenKey();
              // Launch fullscreen for browsers that support it!
              // launchFullScreen(document.getElementById("mobileDevice")); // the whole page
              tetris.init();
              $(window).off("keydown");
              $(document).on("keyup",(e)=>{
                if(e.keyCode === 82) { //R Restart KEY
               $(document).off("keyup");
               $(document).off("keydown");
               console.log("trying to restart game");
               tetris.endGame();
               $route.reload();
             }
           });
$('#menu-select').on("click",()=>{
              /////restart
              $(document).off("keyup");
$(document).off("keydown");
tetris.endGame();
$route.reload();
});



});



$(window).on("keydown",(e)=>{

  switch(e.keyCode) {
    case 13:
    bindFullScreenKey();
    tetris.init();
    $(window).off("keydown");
    $(document).on("keyup",(e)=>{
              if(e.keyCode === 82) { //R Restart Key
                $(document).off("keyup");
                $(document).off("keydown");
                tetris.endGame();
                $route.reload();
                console.log("trying to restart game");
              }
            });
    $('#menu-select').on("click",()=>{
              /////restart
              $(document).off("keyup");
              $(document).off("keydown");
              tetris.endGame();
              $route.reload();
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
          $(window).off("keydown");
            // $(document).off("keydown");
            $location.url('/home');

            $('*').css("overflow","hidden !important");
            $route.reload();
            break;
          }

        });

      }


    };

    Tetris1v1Ctrl.$inject = ['$rootScope', '$scope', 'AuthFactory','$location','$route',"FirebaseFactory"];
    angular.module('TetrisApp').controller('Tetris1v1Ctrl', Tetris1v1Ctrl);
  })();
