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

        $scope.board = values;
        // $scope.$apply();
      } else {
        $scope.board = '';
        // $scope.$apply();
      }
      let gamesref = firebase.database().ref('games');
      gamesref.on("value",(snapshot)=>{
        if(snapshot.val() && Object.values(snapshot.val())[0].user){

          let values= Object.values(snapshot.val());
          $scope.board = values;
          if(!$scope.$$phase) {
            $scope.$apply();
          }
        }else {
          $scope.board = '';
          if(!$scope.$$phase) {
            $scope.$apply();
          }
        }

      });


    });



      //////////////WINDOW INITIALIZATION/////////////
      var yourDeviceWidth = window.matchMedia( "(max-width: 570px)" );
      if (yourDeviceWidth.matches) {
          // window width is at less than 500px
          $("#time").css("visibility","hidden");
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
      $scope.joinGame = joinGame;
      $scope.gameMade = false;
      $scope.board = {};
      $scope.bindFullScreenKey = bindFullScreenKey;
            //////////////AUTHORIZATION METHODS//////////////////////
            function logInGoogle() {
              AuthFactory.logInGoogle()
              .then(response => {
                let user = response.user.uid;
                // $(".progress").css("visibility","hidden");
                $scope.isLoggedIn = true;
                // $location.path("/Tetris1v1");
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
                $scope.logInWithEmailAndPassword(userCredentials);
              });
            }


            function logInWithEmailAndPassword(userCredentials){
              AuthFactory.logInWithEmailAndPassword(userCredentials).then(function(response){

                $location.path("/FTris1on1");
                $route.reload();
              });
            }
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
                    $('.mobileDevices').css({height:'0vh',position:'absolute',top:'9.5%'});
                    $("#base").css('height', '81vh');
                    launchFullScreen(document.getElementById("mobileDevice")); // the whole page
                    $scope.fullScreen = true;
                    $scope.$apply();
                  }else {
                    $('.mobileDevices').css({height:'80vh',left:'33%',top:'0'});
                    $("#base").css('height', '95vh');
                    exitFullScreen(document); // the whole page
                    $scope.fullScreen = false;

                  }
                }

              });
            }
        //////////////INITIALIZING GAME//////////////////////
        function initializeGame(gameCredentials) {

          if (gameCredentials.name === undefined || gameCredentials.name ==='') {
            return false;

          }
          $scope.gameMade = true;
          if(!gameCredentials.password){
            gameCredentials.password = '';
          }
          gameCredentials.user = firebase.auth().currentUser.uid;
          var tetris = new Tetris2({
            rows: 20,
            cols: 10,
            gamePlaceholder: '#tetris',
            previewPlaceholder: '#preview',
            opponentPlaceholder: '#tetris2',
            difficulty:"easy",
            gameBoardRef: gameCredentials
          });


          $scope.bindFullScreenKey();


          $(window).off("keydown");
          $(document).on("keyup",(e)=>{
                if(e.keyCode === 82) { //R Restart KEY
                  $(document).off("keyup");
                  $(document).off("keydown");
                  tetris.endGame();
                  $route.reload();
                }
              });
              $('#menu-select').on("click",()=>{
                $(document).off("keyup");
                $(document).off("keydown");
                tetris.endGame();
                $route.reload();
              });



              $("#onoff").on("click",()=>{
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

            $('*').css("overflow","none !important");
            $route.reload();
            break;
          }

        });

      }
      //////////////////////////////////////////////////////////////////////
      function joinGame(userId) {
        let gameCredentials={};
        FirebaseFactory.getGameBoards(userId).then((item)=>{
          let password = prompt("Password");

          if (password === item[Object.keys(item)[0]].password) {
            $scope.gameMade = true;

            gameCredentials.key = Object.keys(item)[0];
            gameCredentials.user = item[Object.keys(item)[0]].user;
            var tetris = new Tetris2({
              rows: 20,
              cols: 10,
              gamePlaceholder: '#tetris',
              previewPlaceholder: '#preview',
              opponentPlaceholder: '#tetris2',
              difficulty:"easy",
              gameBoardRef: gameCredentials
            });
            setTimeout(()=>{
              tetris.init();
              $scope.bindFullScreenKey();
            },3000);




            $(document).on("keyup",(e)=>{
                if(e.keyCode === 82) { //R Restart KEY
                  $(document).off("keyup");
                  $(document).off("keydown");
                  tetris.endGame();
                  $route.reload();
                }
              });

            $('#menu-select').on("click",()=>{
              $(document).off("keyup");
              $(document).off("keydown");
              tetris.endGame();
              $route.reload();
            });


            $("#onoff").on("click",()=>{
              tetris.endGame();
              $location.url("/home");
              $route.reload();
            });
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
          } else {
            alert("Wrong Password!");
          }
        });
      }

    };

    Tetris1v1Ctrl.$inject = ['$rootScope', '$scope', 'AuthFactory','$location','$route',"FirebaseFactory"];
    angular.module('TetrisApp').controller('Tetris1v1Ctrl', Tetris1v1Ctrl);
  })();
