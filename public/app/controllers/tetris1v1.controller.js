(function() {
  'use strict';
  require('../tetris');
  require('../scoregrid');
  var Tetris1v1Ctrl = function($rootScope, $scope, AuthFactory, $location, $route, FirebaseFactory) {
    var themesong = document.getElementById("myAudio");
    document.querySelectorAll("audio").forEach((item)=>{item.muted = false;});
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
        if(snapshot.val()){
          let values = [];
          let thesnapshot = Object.values(snapshot.val());
          thesnapshot.forEach((item)=>{
            if(item.user) {
              values.push(item);
            }
          });

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
      var yourDeviceWidth = window.matchMedia( "(max-width: 1024px)" );
      if (yourDeviceWidth.matches) {
        $("#time").css("visibility","hidden");
        $('body').css("overflow-y","scroll !important");
      }
      else {
        $('body').css("overflow-y","hidden");
      }

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
      $scope.activatedropdown = activatedropdown;

            //////////////AUTHORIZATION METHODS//////////////////////
            function logInGoogle() {
              AuthFactory.logInGoogle()
              .then(response => {
                let user = response.user.uid;
                // $(".progress").css("visibility","hidden");
                $scope.isLoggedIn = true;
                Materialize.toast('Signed In!',4000);
                $location.path("/FTris1on1");
                $route.reload();
              })
              .catch((error) => {
                console.log("google login error", error.message, error.code);
                Materialize.toast("Sign In Failed! "+error.message,4000);
              });
            }

            function logOutUser() {
              AuthFactory.logOut();
              $location.url('/home');
              $scope.isLoggedIn = false;
              Materialize.toast('Signed Out!',4000);
            }

            function registerWithEmailAndPassword(userCredentials) {
              AuthFactory.registerWithEmailAndPassword(userCredentials).then(response=>{
                $scope.logInWithEmailAndPassword(userCredentials);
                Materialize.toast("Registered!",4000);
              }).catch((error) => {
                Materialize.toast("Registration Failed! "+error.message,4000);
                console.log("registration error", error.message, error.code);
              });
            }


            function logInWithEmailAndPassword(userCredentials){
              AuthFactory.logInWithEmailAndPassword(userCredentials).then(function(response){
                Materialize.toast("Signed In!",4000);
                $location.path("/FTris1on1");
                $route.reload();
              }).catch(function(error) {
                Materialize.toast("Sign In Failed! "+error.message,4000);
              });
            }
            ////////////////ACTIVATION METHODS///////////
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
                if (e.keyCode === 69) {
                  if(!$scope.fullScreen){
                    $('.mobileDevices').css({height:'0vh'});
                    launchFullScreen(document.getElementById("mobileDevice")); // the whole page
                    $scope.fullScreen = true;
                    $scope.$apply();
                  }else {
                    $('.mobileDevices').css({height:'80vh'});
                    exitFullScreen(document); // the whole page
                    $scope.fullScreen = false;

                  }
                }

              });
            }
            function activatedropdown() {
             $('.button-collapse').sideNav('destroy');
           }
           $(document).on("keyup",(e)=>{
            switch(e.keyCode) {
              case 27: /// ESC KEY
              $(window).off("keydown");
                // $(document).off("keydown");
                $location.url('/home');

                $('*').css("overflow","none !important");
                $route.reload();
                break;
              }

            });


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
      $('.lever').on("click",(e)=>{
        let checkstate = e.target.parentNode.querySelector("input[type=checkbox]").checked;
        if (e.target.id==='music') {
          if(checkstate) {
            e.target.parentNode.querySelector("input[type=checkbox]").checked = false;
            document.querySelectorAll("audio")[0].muted = true;
          }else{
            e.target.parentNode.querySelector("input[type=checkbox]").checked = true;
            document.querySelectorAll("audio")[0].muted = false;
          }
        }
        else if (e.target.id==='sound') {
          if(checkstate) {
            e.target.parentNode.querySelector("input[type=checkbox]").checked = false;
            document.querySelectorAll("audio").forEach((item,index)=>{
              if(index>0){
                item.muted = true;
              }
            });
          }else{
            e.target.parentNode.querySelector("input[type=checkbox]").checked = true;
            document.querySelectorAll("audio").forEach((item,index)=>{
              if(index>0){
                item.muted = false;
              }
            });
          }
        }

      });

    }
      //////////////////////////////////////////////////////////////////////
      function joinGame(userId) {
        $('.waves-effect input').val('Please wait ...');
        $('.waves-effect')
        .attr('disabled',true);

        let gameCredentials={};
        FirebaseFactory.getGameBoard(userId).then((item)=>{
          let password = prompt("Password");


          if (password === Object.values(item)[0].password) {

            $scope.gameMade = true;

            gameCredentials.key = Object.keys(item)[0];
            gameCredentials.user = item[Object.keys(item)[0]].user;
            let database = firebase.database().ref('games/'+gameCredentials.key);
            database.set(1);
            var tetris = new Tetris2({
              rows: 20,
              cols: 10,
              gamePlaceholder: '#tetris',
              previewPlaceholder: '#preview',
              opponentPlaceholder: '#tetris2',
              difficulty:"easy",
              gameBoardRef: gameCredentials
            });

            $('#progressbar').show();
            var timeleft = 5;
            var downloadTimer = setInterval(function(){
              document.getElementById("progressBar").value = --timeleft;
              if(timeleft <= 0) {
                clearInterval(downloadTimer);
                $('#progressbar').hide();
                themesong.currentTime = 0;
                themesong.play();
                $scope.bindFullScreenKey();
                tetris.init();
              }

            },1000);
           //  setTimeout(()=>{
           //   setTimeout(()=>{
           //     tetris.init();

           //   },506);
           // },5000);





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
          setTimeout(()=>{
           $('.waves-effect').attr('disabled',false);
           $('.waves-effect input').val('Join Game');

         },10);
        }

      });
      }

    };

    Tetris1v1Ctrl.$inject = ['$rootScope', '$scope', 'AuthFactory','$location','$route',"FirebaseFactory"];
    angular.module('TetrisApp').controller('Tetris1v1Ctrl', Tetris1v1Ctrl);
  })();
