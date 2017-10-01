(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
angular.module('TetrisApp', ['ngRoute']);


angular.module('TetrisApp').config(function($routeProvider) {
  // let isAuth = ($location) => {
  //       return new Promise((resolve,reject)=>{
  //           let truth = firebase.auth().currentUser.uid;
  //           if (truth){
  //               resolve();
  //           } else {

  //             $location.url("/home");

  //           }
  //       });
  //   };

  $routeProvider
    .when("/home", {
      templateUrl: "partials/home.html",
      controller: 'HomeCtrl'
    }).when("/Tetris", {
      templateUrl: "partials/tetris.html",
      controller: 'TetrisCtrl'
    }).when("/FTris1on1", {
      templateUrl: "partials/tetris1v1.html",
      controller: 'Tetris1v1Ctrl'
      // resolve: {isAuth}
    }).when("/register", {
      templateUrl: "partials/register.html",
      controller: 'Tetris1v1Ctrl'
    })
    .otherwise("/home");
});

angular.module('TetrisApp').run(function($rootScope, $window, firebaseInfo) {

  firebase.initializeApp(firebaseInfo);
  // firebase.auth().signOut();

});

},{}],2:[function(require,module,exports){
// "use strict";
//     var canvas = document.getElementById("myCanvas");
//     var ctx = canvas.getContext("2d");
//     var x = canvas.width/2;
//     var y = canvas.height-30;
//     var dx = -2;
//     var dy = -2;

//     var fontBase = 1000,
//         fontSize = 70,
//         ratio;

//     var gamePaused = false;
//     var game;
//     var gamestatus='';
//     var pause;

//     function update() {
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;
//         ctx.font = getFont();
//     }


//     // window.onresize = update;

//     function getFont() {
//         var ratio = fontSize / fontBase;
//         var size = canvas.width * ratio;

//         return (size|0) + 'px sans-serif';
//     }                    // default size for font


//     function drawPause() {
//         update();
//         // ctx.beginPath();
//         ctx.fillStyle = "white";

//         ctx.fillText(gamestatus, 100, 100);
//         // ctx.closePath();
//     }


//     function pauseGame(e) {
//               if (!gamePaused) {
//                 gamestatus='||  Paused';
//                 pause = setInterval(()=>{
//                         drawPause();
//                     },450);
//                 gamePaused = true;
//                 $('#myCanvas').css("z-index",1);
//                     game = setInterval(function() {
//                         ctx.clearRect(0, 0, canvas.width, canvas.height);

//                 },900);
//               }
//               else if (gamePaused) {
//                 ctx.clearRect(0, 0, canvas.width, canvas.height);
//                 gamePaused = false;
//                 gamestatus='';
//                 $('#myCanvas').css("z-index",-1);
//                 game = clearInterval(game);
//                 pause = clearInterval(pause);
//               }

//     }



//     function moverandomly() {
//         x = Math.floor((Math.random() * 10) + 1);
//         y = Math.floor((Math.random() * 20) + 1);
//         dx = Math.floor((Math.random() * 10) + 1);
//         dy = Math.floor((Math.random() * 20) + 1);

//     }
//     function getRandomColor() {
//         var letters = '0123456789ABCDEF';
//         var color = '#';
//         for (var i = 0; i < 6; i++) {
//           color += letters[Math.floor(Math.random() * 16)];
//         }
//         return color;
//     }

//     module.exports = pauseGame;

},{}],3:[function(require,module,exports){
(function() {
  'use strict';

  var HomeCtrl = function($rootScope, $scope,$window,FirebaseFactory) {
    $('body').css("overflow","hidden");
    $('body').css("overflow","none");
    $('body').css("height","100vh");
    $('.overlay').css("height","100vh");
    $('.overlay').css("overflow","none");
    $(document).off("keydown");
    $(window).off("keydown");
    $(document).off("keyup");
    document.querySelectorAll("audio").forEach((item)=>{item.muted = false;});
    $scope.getHighScores = getHighScores;
    $scope.highScorePlayers=[];
    function space1(thing, from, to) {
      TweenMax.fromTo(thing, Math.floor(Math.random() * 100), { y: from }, { y: to,
        onComplete: space1,
        onCompleteParams: [thing, from, to],
        ease: Linear.easeNone });
    }

    var itemsDown = [".1light4", ".1light5", ".1light6", ".1light7", ".1light8", ".1light11", ".1light12", ".1light13", ".1light14", ".1light15", ".1light16"].forEach(function (e) {
      return space1(e, -1080, 1080);
    });
    var itemsUp = [".1light1", ".1light2", ".1light3", ".1light9", ".1light10", ".1light17"].forEach(function (e) {
      return space1(e, 1080, -1080);
    });
    //////////////HOME ANIMATION EVENTS///////////////
    document.getElementById("play").focus();
    $('.overlay').css("display","block").css("opacity","0");
    setTimeout(()=>{
      $('.overlay').css("transition","all 3s").css("transform","scale(1.2)");
      $('.overlay').css("opacity","1").css("ease-in","20s");
            // setTimeout(()=>{

            // },1000);
            $('.overlay').css("overflow","hidden");
          },1000);
    //////////////CLICK EVENTS///////////////
    $(window).on("click",()=>{
      if (document.getElementById("play")===null) {
        return false;
      }
      if(document.getElementById("play").checked === true) {
        document.getElementById("play").focus();

      } else if (document.getElementById("highScores").checked) {
        document.getElementById("highScores").focus();
      }
      else if (document.getElementById("multiplay").checked) {
        document.getElementById("multiplay").focus();

      } else if (document.getElementById("howToPlay").checked) {
        document.getElementById("howToPlay").focus();
      }
    });


    document.getElementById("playButton").addEventListener("click",()=>{

      $('body').css("overflow-y","hidden !important");
      $('.colorTheme').css("transition","all 1.5s").css("transform","scale(5)");
      setTimeout(()=>{

        $window.location.href = "#!/Tetris";
      },1000);
    });
    document.getElementById("multiButton").addEventListener("click",()=>{

      $('body').css("overflow-y","hidden !important");
      $('.colorTheme').css("transition","all 1.5s").css("transform","scale(5)");
      setTimeout(()=>{

        $window.location.href = "#!/FTris1on1";
      },1000);
    });
    document.getElementById("highScoresButton").addEventListener("click",()=>{
      $("#playButton").css("background-color","rgba(255,255,255,0)");
      $("#howToPlayButton").css("background-color","rgba(255,255,255,0)");
      $("#multiButton").css("background-color","rgba(255,255,255,0)");
      $("#highScoresButton").css("background-color","rgba(255,255,255,0.4)");
    });
    document.getElementById("howToPlay").addEventListener("click",()=>{
      $("#highScoresButton").css("background-color","rgba(255,255,255,0)");
      $("#playButton").css("background-color","rgba(255,255,255,0)");
      $("#multiButton").css("background-color","rgba(255,255,255,0)");
      $("#howToPlayButton").css("background-color","rgba(255,255,255,0.4)");
    });
    //////////////KEYBOARD EVENTS///////////////
    $(window).on("keyup",(e)=>{
      if (document.getElementById("play")===null) {
        return false;
      }
      if(document.getElementById("play").checked === true) {
        $("#howToPlayButton").css("background-color","rgba(255,255,255,0)").removeClass('hoverclass');
        $("#highScoresButton").css("background-color","rgba(255,255,255,0)").removeClass('hoverclass');
        $("#multiButton").css("background-color","rgba(255,255,255,0)").removeClass('hoverclass');
        $("#playButton").css("background-color","rgba(255,255,255,0.4)").addClass('hoverclass');

      } else if (document.getElementById("multiplay").checked) {
        $("#playButton").css("background-color","rgba(255,255,255,0)").removeClass('hoverclass');
        $("#howToPlayButton").css("background-color","rgba(255,255,255,0)").removeClass('hoverclass');
        $("#highScoresButton").css("background-color","rgba(255,255,255,0)").removeClass('hoverclass');
        $("#multiButton").css("background-color","rgba(255,255,255,0.4)").addClass('hoverclass');
      }else if (document.getElementById("highScores").checked) {
        $("#playButton").css("background-color","rgba(255,255,255,0)").removeClass('hoverclass');
        $("#howToPlayButton").css("background-color","rgba(255,255,255,0)").removeClass('hoverclass');
        $("#multiButton").css("background-color","rgba(255,255,255,0)").removeClass('hoverclass');
        $("#highScoresButton").css("background-color","rgba(255,255,255,0.4)").addClass('hoverclass');
      } else if (document.getElementById("howToPlay").checked) {
        $("#highScoresButton").css("background-color","rgba(255,255,255,0)").removeClass('hoverclass');
        $("#playButton").css("background-color","rgba(255,255,255,0)").removeClass('hoverclass');
        $("#multiButton").css("background-color","rgba(255,255,255,0)").removeClass('hoverclass');
        $("#howToPlayButton").css("background-color","rgba(255,255,255,0.4)").addClass('hoverclass');
      }
      switch(e.keyCode) {
        case 13:
        if(document.getElementById("play").checked){
          $('body').css("overflow-y","scroll !important");
          $('.colorTheme').css("transition","all 1.5s").css("transform","scale(5)");
          setTimeout(()=>{

            $window.location.href = "#!/Tetris";
          },1000);
        }else if(document.getElementById("multiplay").checked){
          $('body').css("overflow-y","scroll !important");
          $('.colorTheme').css("transition","all 1.5s").css("transform","scale(5)");
          setTimeout(()=>{

            $window.location.href = "#!/FTris1on1";
          },1000);
        }else if(document.getElementById("highScores").checked) {
          $("#highScoreModal").modal("toggle");
          document.getElementById("highScores").focus();
        } else if(document.getElementById("howToPlay").checked) {
          $("#howToPlayModal").modal("toggle");
          document.getElementById("howToPlay").focus();
        } else {
          document.getElementById("play").focus();
        }
      }
    });
    ////////////////HIGH SCORE MODAL///////////////
    function getHighScores() {
      FirebaseFactory.getHighScores().then((score)=>{
        let scores = score;
        let keys = Object.keys(scores);
        let values = Object.values(scores);

        values.sort((a,b)=>{

          if (a.score < b.score){
            return 1;
          }
          if (a.score > b.score){
            return -1;
          }
          return 0;
        });
        values = values.splice(0,3);
        $scope.highScorePlayers=values;
      });
    }
    $scope.getHighScores();


  };

  HomeCtrl.$inject = ['$rootScope', '$scope','$window','FirebaseFactory'];
  angular.module('TetrisApp').controller('HomeCtrl', HomeCtrl);
})();

},{}],4:[function(require,module,exports){
(function() {
  'use strict';
  require('../tetris');
  require('../scoregrid');
  var TetrisCtrl = function($rootScope, $scope, AuthFactory, $location, $route, FirebaseFactory) {
    var themesong = document.getElementById("myAudio");
    document.querySelectorAll("audio").forEach((item)=>{item.muted = false;});
    themesong.currentTime = 0;





      //////////////WINDOW INITIALIZATION/////////////
      var yourDeviceWidth = window.matchMedia( "(max-width: 570px)" );
      if (yourDeviceWidth.matches) {
          // window width is at less than 500px
          $('body').css("overflow-y","scroll");
        }
        else {
          $('body').css("overflow-y","hidden");

        }
        var spaceDeviceWidth = window.matchMedia( "(min-width: 1036px)" );
        if (spaceDeviceWidth.matches) {
         setTimeout(()=>{
          $('.space1').fadeIn();
        },3000);
       }

        // $(".dropdown-button").dropdown();
        // $(".button-collapse").sideNav();
        // $("#sidenav-overlay").css("display",'none');
      //////////////VARIABLE DECLARATIONS////////////
      $scope.isLoggedIn = firebase.auth().currentUser;
      $scope.fullScreen = false;
      $scope.highScore = '';

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
            if (e.keyCode ===69) {
              if(!$scope.fullScreen){
                $('.mobileDevices').css({height:'0vh'});
                    launchFullScreen(document.getElementById("mobileDevice")); // the whole page
                    $scope.fullScreen = true;
                    $scope.$apply();
                  }else {
                    $('.mobileDevices').css({height:'80vh'});
                    exitFullScreen(document); // the whole page
                    $scope.fullScreen = false;
                    $scope.$apply();
                  }
                }

              });
        }
        bindFullScreenKey();
        // tetris.init();
        // tetris.grid.getCellAt(2,0).$el.css('background','red');
        $('.lever').on("click",(e)=>{
          let checkstate = e.target.parentNode.querySelector("input[type=checkbox]").checked;

          if (e.target.id==='difficulty') {
            if(checkstate) {
              e.target.parentNode.querySelector("input[type=checkbox]").checked = false;
            }else{
              e.target.parentNode.querySelector("input[type=checkbox]").checked = true;
            }

          }
          else if (e.target.id==='blockcolor') {
            if(checkstate) {
              e.target.parentNode.querySelector("input[type=checkbox]").checked = false;
            }else{
              e.target.parentNode.querySelector("input[type=checkbox]").checked = true;
            }

          }
          else if (e.target.id==='music') {
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

        $("#startGame").on("click",()=>{
              // Launch fullscreen for browsers that support it!
              // launchFullScreen(document.getElementById("mobileDevice")); // the whole page
              tetris.init();
              $(window).off("keydown");
              $(document).on("keyup",(e)=>{
                if(e.keyCode === 82) { //R Restart KEY
                 $(document).off("keyup");
                 $(document).off("keydown");
                 themesong.pause();
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
            tetris.init();
            $(window).off("keydown");
            $(document).on("keyup",(e)=>{
              if(e.keyCode === 82) { //R Restart Key
                $(document).off("keyup");
                $(document).off("keydown");
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
            break;

          }
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


    if($location.url()==="/Tetris"){
      $(".button-collapse").sideNav('destroy');
      initializeGame();
    }

    function getHighScoreToBeat() {
      let highscore = FirebaseFactory.getLowestHighScore().then((item)=>{

        $scope.highScore = item;
      });

    }

    getHighScoreToBeat();

      // $(window).on("click",()=>{
      //   $(".drag-target").css("display",'none');
      //   $("#sidenav-overlay").css("z-index",'-1');
      //   $("#sidenav-overlay").css("display",'none');
      // });

    };

    TetrisCtrl.$inject = ['$rootScope', '$scope', 'AuthFactory','$location','$route',"FirebaseFactory"];
    angular.module('TetrisApp').controller('TetrisCtrl', TetrisCtrl);
  })();

},{"../scoregrid":10,"../tetris":13}],5:[function(require,module,exports){
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
          var spaceDeviceWidth = window.matchMedia( "(min-width: 1036px)" );
          if (spaceDeviceWidth.matches) {
           setTimeout(()=>{
            $('.space1').fadeIn();
          },2000);
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

         $('.silplate').css('visibility','hidden');
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
            var spaceDeviceWidth = window.matchMedia( "(min-width: 1036px)" );
            if (spaceDeviceWidth.matches) {
             setTimeout(()=>{
              $('.space1').fadeIn();
            },2000);
           }
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
           $('.silplate').css('visibility','hidden');
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

},{"../scoregrid":10,"../tetris":13}],6:[function(require,module,exports){
(function() {
  'use strict';

  var AuthFactory = function($http, $rootScope) {
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

},{}],7:[function(require,module,exports){
(function() {
  'use strict';

  var FirebaseFactory = function($q, $http, $rootScope,firebaseInfo) {
    var lowestHighScore = '';
    return {
      getHighScores: function(){
        let scores;
        return $q( (resolve, reject) => {
          $http.get(`${firebaseInfo.databaseURL}/highscores.json`)
          .then((itemObject) => {
            scores = (itemObject.data);
            resolve(scores);
          })
          .catch((error) => {
            reject(error);
          });
        });
      },
      getLowestHighScore: function(){


        let scores;
        return $q( (resolve, reject) => {
          $http.get(`${firebaseInfo.databaseURL}/highscores.json`)
          .then((itemObject) => {
            scores = (itemObject.data);

            let keys = Object.keys(scores);
            let values = Object.values(scores);

            values.sort((a,b)=>{

              if (a.score < b.score){
                return 1;
              }
              if (a.score > b.score){
                return -1;
              }
              return 0;
            });
            values = values.splice(0,3);
            lowestHighScore = values[0].score;
            resolve(lowestHighScore);
          })
          .catch((error) => {
            reject(error);
          });
        });




      },
      getGameBoards: function(){
        let boards;
        return $q( (resolve, reject) => {
          $http.get(`${firebaseInfo.databaseURL}/games.json`)
          .then((itemObject) => {
            boards = (itemObject.data);
            resolve(boards);
          })
          .catch((error) => {
            reject(error);
          });
        });
      },
      getGameBoard: function(userId){
        let boards;
        return $q( (resolve, reject) => {
          $http.get(`https://tetris-arena.firebaseio.com/games.json?equalTo="${userId}"&orderBy="user"`)
          .then((itemObject) => {
            boards = (itemObject.data);
            resolve(boards);
          })
          .catch((error) => {
            reject(error);
          });
        });
      }
    };
  };

  FirebaseFactory.$inject = ['$q','$http', '$rootScope','firebaseInfo'];
  angular.module('TetrisApp').factory('FirebaseFactory', FirebaseFactory);
})();

},{}],8:[function(require,module,exports){
"use strict";
(function ( global ) {


  function Cell( config ) {
    this.$el = config.$element;
    this.x = config.x;
    this.y = config.y;
  }

  function Grid( config ) {
    this.grid = [];
    this.cells = [];
    this.rowsCount = config.rows;
    this.colsCount = config.cols;
    this.rows = [];
    this.cols = [];
    if (config.render) {
      this.placeholder = config.render.boardplaceholder;
      this.render();
    }
  }
  Grid.prototype = {
    createCell: function( config ) {
      return new Cell(config);
    },
    getCellAt: function( x, y ) {
      if (!this.grid[y]) {
        // console.warn("No such Y coordinate: %i (grid size is: x[%i], y[%i])", y, this.colsCount, this.rowsCount);
        return false;
      }
      if (!this.grid[y][x]) {
        // console.warn("No such X coordinate: %i (grid size is: x[%i], y[%i])", x, this.colsCount, this.rowsCount);
        return false;
      }
      return this.grid[y][x];
    },
    getGrid: function () {
      return this.grid;
    },
    render: function( ) {

      this.$placeholder = $(this.placeholder);
      if (!this.placeholder || this.$placeholder.length === 0) {

        console.log('Placeholder is not present');
        return;
      }
      var i, j, $row, $cell, cell, cellId = 0;
      for (i = 0; i < this.rowsCount; i += 1) {
        this.grid[i] = [];
        $row = $('<div class="row"></div>').prependTo(this.$placeholder);
        for (j = 0; j < this.colsCount; j += 1) {
          $cell = $('<div class="cell"></div>').appendTo($row);
          cell = this.createCell({$element: $cell, x: j, y: i});
          this.grid[i].push(cell);
          this.cells.push(cell);
        }
      }
      // rows
      var self = this;


      this.grid.forEach(function( row ) {
        self.rows.push(row);
      });
    }
  };

  global.Grid = Grid;

}(window));

},{}],9:[function(require,module,exports){
angular.module('TetrisApp').constant("firebaseInfo", {
    apiKey: "AIzaSyBNq9eV8vzdFJwUlxCzeAh3wsC5apGsdjY",
    authDomain: "tetris-arena.firebaseapp.com",
    databaseURL: "https://tetris-arena.firebaseio.com",
    projectId: "tetris-arena",
    storageBucket: "",
    messagingSenderId: "735100394750"
});

},{}],10:[function(require,module,exports){
"use strict";
(function instantiateLiveTime(){
    var time = new Date();
    var day = time.getDate();
    var month = time.getMonth();
    var year = time.getFullYear();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var sec = time.getSeconds();
    hour = getNonMilitaryTime(hour);
    minute = getTime(minute);
    sec = getTime(sec);
    $('#time').html(month+1+ "/" + day  + "/" + year + `<br>` + hour + ":" + minute + ":" + sec);
    var newTime = setTimeout(instantiateLiveTime, 1000);
    function getTime(i){
        if(i < 10){
            i ="0" +i;
        }
        return i;
    }
    function getNonMilitaryTime(i){
        if (i===0){
            i = 12;
        }
        else if(i > 12){
            i =i-12;
        }
        return i;
    }
})();


},{}],11:[function(require,module,exports){
(function( global ){
  "use strict";

  var colors = [
  'aqua',
  '#f9f816',
  'lawngreen',
  'rgb(252, 34, 109)',
  '#1a33e1',
  'orange',
  'springgreen',
  'gold'
  ];


  var Shape = {};

  function BaseShape() {
    // this.getRandomColor();
  }
  BaseShape.prototype.constructor = BaseShape;

  BaseShape.prototype.occupyCell = function( cell ) {
    if (cell.isSolid) {
      // console.error('failed render');
      this.collisionState.triggerEvent('failedRender', [cell]);
      return false;
    }
    cell.$el.css('background', this.color);
    cell.isCurrentShape = true;
    this.cells.push(cell);
    return this;
  };

  BaseShape.prototype.occupyCells = function() {
    var self = this;
    this.coords.forEach(function( coord ) {
      self.occupyCell(self.grid.getCellAt(coord.x, coord.y));
    });
    return this;
  };

  BaseShape.prototype.freeCells = function() {
    var self = this;
    this.cells.forEach(function( cell ) {
      self.freeCell(cell);
    });
    this.cells = [];
    return this;
  };

  BaseShape.prototype.moveLeft = function() {
    this.makeMove({x: -1, y: 0});
  };

  BaseShape.prototype.moveRight = function() {
    this.makeMove({x: 1, y: 0});
  };

  BaseShape.prototype.moveDown = function() {
    this.makeMove({x: 0, y: -1}, function() {
      this.markAsSolid();
      this.collisionState.triggerEvent('landed');
    });
  };

  BaseShape.prototype.rotate = function() {
    var data = this.getRotationData();
    var coords = data[0];
    var newRotationState = data[1];

    var self = this;
    var canRotate = coords.every(function( coord ) {
      var newCell = self.grid.getCellAt(coord.x, coord.y);
      return !(!newCell || newCell.isSolid);
    });
    if (canRotate) {
      this.clearCoords();
      this.freeCells();
      coords.forEach(function( coord ) {
        self.occupyCell(self.grid.getCellAt(coord.x, coord.y));
      });

      this.rotationState = newRotationState;
    }
  };

  BaseShape.prototype.makeMove = function( move, onObstacle ) {
    var self = this;
    var canMakeMove = this.cells.every(function( cell ) {
      var newCell = self.grid.getCellAt(cell.x + move.x, cell.y + move.y);
      return !(!newCell || newCell.isSolid);
    });
    if (canMakeMove) {
      this.clearCoords();
      this.saveCoords();
      this.freeCells();
      this.coords.forEach(function( coord ) {
        self.occupyCell(self.grid.getCellAt(coord.x + move.x, coord.y + move.y));
      });
      // let eachrow = this.grid.grid.forEach((item)=>{
      //   item.forEach((items)=>{
      //     if (items.isSolid || items.isCurrentShape){
      //       console.log("items", this);
      //       // this.grid.opponent.getCellAt(items.x,items.y).$el.css('background','red');
      //     }

      //   });
      // });
    } else if (onObstacle) {
      onObstacle.call(this);
    }

    // console.log("what is this.grid", this.grid);
  };

  BaseShape.prototype.clearCoords = function() {
    this.coords = [];
  };

  BaseShape.prototype.saveCoords = function() {
    var self = this;
    this.cells.forEach(function( cell ) {
      self.coords.push({x: cell.x, y: cell.y});
    });
  };

  BaseShape.prototype.freeCell = function( cell ) {
    cell.$el.css('background', '#6a7941');
    cell.isCurrentShape = false;
    return this;
  };

  BaseShape.prototype.markAsSolid = function() {
    this.cells.forEach(function( cell ) {
      cell.isSolid = true;
      cell.isCurrentShape = false;
    });
  };

  // BaseShape.prototype.getRandomColor = function() {
  //   let self = this;
  //   this.color = colors[Math.floor(Math.random() * colors.length)];
  //   return this.color;
  // };
  BaseShape.prototype.getRandomColors = function() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  BaseShape.prototype.onInit = function(grid, collisionState ) {
    this.rotationState = 1;
    this.collisionState = collisionState;
    this.grid = grid;
    this.events = [];
    this.coords = [];
    this.cells = [];
    this.setInitialCoordinates();
    this.occupyCells();
  };

  function OShape( grid, collisionState ) {
    this.onInit(grid,collisionState);
    let self = this;
    let checkstate = $('#blockcolor').parent().parent()[0].querySelector("input[type=checkbox]").checked;
    if(checkstate) {
      self.color = colors[0];
    }else{
      self.color = 'black';
    }
    this.cells.forEach(function( cell ) {
      cell.$el.css('background', self.color);
    });

  }
  OShape.prototype = new BaseShape();
  OShape.prototype.constructor = OShape;
  OShape.prototype.setInitialCoordinates = function() {
    var firstRow = this.grid.rowsCount - 1;
    var secondRow = this.grid.rowsCount - 2;
    var middleColumn = parseInt(this.grid.colsCount / 2, 10);
    this.coords.push({x: middleColumn-1, y: firstRow});
    this.coords.push({x: middleColumn-1, y: secondRow});
    this.coords.push({x: middleColumn, y: firstRow});
    this.coords.push({x: middleColumn, y: secondRow});
  };
  OShape.prototype.rotate = function() {
  };

  function TShape( grid, collisionState ) {
    this.onInit(grid,collisionState);
    let self = this;
    let checkstate = $('#blockcolor').parent().parent()[0].querySelector("input[type=checkbox]").checked;
    if(checkstate) {
      self.color = colors[1];
    }else{
      self.color = 'black';
    }
    this.cells.forEach(function( cell ) {
      cell.$el.css('background', self.color);
    });
  }
  TShape.prototype = new BaseShape();
  TShape.prototype.constructor = TShape;
  TShape.prototype.setInitialCoordinates = function() {
    var firstRow = this.grid.rowsCount - 1;
    var secondRow = this.grid.rowsCount - 2;
    var middleColumn = parseInt(this.grid.colsCount / 2, 10);
    this.coords.push({x: middleColumn, y: secondRow});
    this.coords.push({x: middleColumn, y: firstRow});
    this.coords.push({x: middleColumn - 1, y: secondRow});
    this.coords.push({x: middleColumn + 1, y: secondRow});
  };
  TShape.prototype.getRotationData = function() {
    var center;
    var coords = [];
    var newRotationState;
    switch (this.rotationState) {
      case 1:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x, y: center.y + 1});
      coords.push({x: center.x + 1, y: center.y});
      coords.push({x: center.x, y: center.y - 1});
      newRotationState = 2;
      break;
      case 2:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x - 1, y: center.y});
      coords.push({x: center.x + 1, y: center.y});
      coords.push({x: center.x, y: center.y - 1});
      newRotationState = 3;
      break;
      case 3:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x - 1, y: center.y});
      coords.push({x: center.x, y: center.y + 1});
      coords.push({x: center.x, y: center.y - 1});
      newRotationState = 4;
      break;
      case 4:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x - 1, y: center.y});
      coords.push({x: center.x, y: center.y + 1});
      coords.push({x: center.x + 1, y: center.y});
      newRotationState = 1;
      break;
    }
    return [coords, newRotationState];
  };

  function SShape( grid, collisionState ) {
    this.onInit(grid,collisionState);
    let self = this;
    let checkstate = $('#blockcolor').parent().parent()[0].querySelector("input[type=checkbox]").checked;
    if(checkstate) {
      self.color = colors[2];
    }else{
      self.color = 'black';
    }
    this.cells.forEach(function( cell ) {
      cell.$el.css('background', self.color);
    });
  }
  SShape.prototype  = new BaseShape();
  SShape.prototype.constructor = SShape;
  SShape.prototype.setInitialCoordinates = function() {
    var secondRow = this.grid.rowsCount - 2;
    var middleColumn = parseInt(this.grid.colsCount / 2, 10);
    this.coords.push({x: middleColumn, y: secondRow});
    this.coords.push({x: middleColumn - 1, y: secondRow});
    this.coords.push({x: middleColumn - 1, y: secondRow + 1});
    this.coords.push({x: middleColumn, y: secondRow - 1});
  };
  SShape.prototype.getRotationData = function() {
    var center;
    var coords = [];
    var newRotationState;
    switch (this.rotationState) {
      case 1:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x, y: center.y + 1});
      coords.push({x: center.x + 1, y: center.y + 1});
      coords.push({x: center.x - 1, y: center.y});
      newRotationState = 2;
      break;
      case 2:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x - 1, y: center.y});
      coords.push({x: center.x - 1, y: center.y + 1});
      coords.push({x: center.x, y: center.y - 1});
      newRotationState = 1;
      break;
      case 3:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x, y: center.y + 1});
      coords.push({x: center.x + 1, y: center.y + 1});
      coords.push({x: center.x - 1, y: center.y});
      newRotationState = 4;
      break;
      case 4:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x - 1, y: center.y});
      coords.push({x: center.x - 1, y: center.y + 1});
      coords.push({x: center.x, y: center.y - 1});
      newRotationState = 1;
      break;
    }
    return [coords, newRotationState];
  };

  function ZShape( grid, collisionState ) {
    this.onInit(grid,collisionState);
    let self = this;
    let checkstate = $('#blockcolor').parent().parent()[0].querySelector("input[type=checkbox]").checked;
    if(checkstate) {
      self.color = colors[3];
    }else{
      self.color = 'black';
    }
    this.cells.forEach(function( cell ) {
      cell.$el.css('background', self.color);
    });
  }
  ZShape.prototype  = new BaseShape();
  ZShape.prototype.constructor = ZShape;
  ZShape.prototype.setInitialCoordinates = function() {
    var secondRow = this.grid.rowsCount - 2;
    var middleColumn = parseInt(this.grid.colsCount / 2, 10);
    this.coords.push({x: middleColumn, y: secondRow});
    this.coords.push({x: middleColumn - 1, y: secondRow});
    this.coords.push({x: middleColumn - 1, y: secondRow - 1});
    this.coords.push({x: middleColumn, y: secondRow + 1});
  };
  ZShape.prototype.getRotationData = function() {
    var center;
    var coords = [];
    var newRotationState;
    switch (this.rotationState) {
      case 1:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x, y: center.y + 1});
      coords.push({x: center.x + 1, y: center.y});
      coords.push({x: center.x - 1, y: center.y + 1});
      newRotationState = 2;
      break;
      case 2:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x - 1, y: center.y});
      coords.push({x: center.x - 1, y: center.y - 1});
      coords.push({x: center.x, y: center.y + 1});
      newRotationState = 1;
      break;
      case 3:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x, y: center.y + 1});
      coords.push({x: center.x + 1, y: center.y});
      coords.push({x: center.x - 1, y: center.y + 1});
      newRotationState = 4;
      break;
      case 4:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x - 1, y: center.y});
      coords.push({x: center.x - 1, y: center.y - 1});
      coords.push({x: center.x, y: center.y + 1});
      newRotationState = 1;
      break;
    }
    return [coords, newRotationState];
  };

  function LShape( grid, collisionState ) {
    this.onInit(grid,collisionState);
    let self = this;
    let checkstate = $('#blockcolor').parent().parent()[0].querySelector("input[type=checkbox]").checked;
    if(checkstate) {
      self.color = colors[4];
    }else{
      self.color = 'black';
    }
    this.cells.forEach(function( cell ) {
      cell.$el.css('background', self.color);
    });
  }
  LShape.prototype = new BaseShape();
  LShape.prototype.constructor = LShape;
  LShape.prototype.setInitialCoordinates = function() {
    var secondRow = this.grid.rowsCount - 2;
    var middleColumn = parseInt(this.grid.colsCount / 2, 10)-1;
    this.coords.push({x: middleColumn, y: secondRow});
    this.coords.push({x: middleColumn, y: secondRow + 1});
    this.coords.push({x: middleColumn, y: secondRow - 1});
    this.coords.push({x: middleColumn + 1, y: secondRow - 1});
  };
  LShape.prototype.getRotationData = function() {
    var center;
    var coords = [];
    var newRotationState;
    switch (this.rotationState) {
      case 3:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x - 1, y: center.y});
      coords.push({x: center.x + 1, y: center.y});
      coords.push({x: center.x + 1, y: center.y + 1});
      newRotationState = 4;
      break;
      case 2:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x, y: center.y + 1});
      coords.push({x: center.x, y: center.y - 1});
      coords.push({x: center.x - 1, y: center.y + 1});
      newRotationState = 3;
      break;
      case 1:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x-1, y: center.y});
      coords.push({x: center.x + 1, y: center.y});
      coords.push({x: center.x-1, y: center.y - 1});
      newRotationState = 2;
      break;
      case 4:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x, y: center.y + 1});
      coords.push({x: center.x, y: center.y - 1});
      coords.push({x: center.x + 1, y: center.y - 1});
      newRotationState = 1;
      break;
    }
    return [coords, newRotationState];
  };

  function JShape( grid, collisionState ) {
    this.onInit(grid,collisionState);
    let self = this;
    let checkstate = $('#blockcolor').parent().parent()[0].querySelector("input[type=checkbox]").checked;
    if(checkstate) {
      self.color = colors[5];
    }else{
      self.color = 'black';
    }
    this.cells.forEach(function( cell ) {
      cell.$el.css('background', self.color);
    });
  }
  JShape.prototype = new BaseShape();
  JShape.prototype.constructor = JShape;
  JShape.prototype.setInitialCoordinates = function() {
    var secondRow = this.grid.rowsCount - 2;
    var middleColumn = parseInt(this.grid.colsCount / 2, 10);
    this.coords.push({x: middleColumn, y: secondRow});
    this.coords.push({x: middleColumn, y: secondRow + 1});
    this.coords.push({x: middleColumn, y: secondRow - 1});
    this.coords.push({x: middleColumn -1, y: secondRow - 1});
  };
  JShape.prototype.getRotationData = function() {
    var center;
    var coords = [];
    var newRotationState;
    switch (this.rotationState) {
      case 1:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x - 1, y: center.y});
      coords.push({x: center.x + 1, y: center.y});
      coords.push({x: center.x - 1, y: center.y + 1});
      newRotationState = 2;
      break;
      case 2:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x, y: center.y + 1});
      coords.push({x: center.x + 1, y: center.y + 1});
      coords.push({x: center.x, y: center.y - 1});
      newRotationState = 3;
      break;
      case 3:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x - 1, y: center.y});
      coords.push({x: center.x + 1, y: center.y});
      coords.push({x: center.x + 1, y: center.y - 1});
      newRotationState = 4;
      break;
      case 4:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x, y: center.y + 1});
      coords.push({x: center.x, y: center.y - 1});
      coords.push({x: center.x - 1, y: center.y - 1});
      newRotationState = 1;
      break;
    }
    return [coords, newRotationState];
  };

  function IShape( grid, collisionState) {
    this.onInit(grid,collisionState);
    let self = this;
    let checkstate = $('#blockcolor').parent().parent()[0].querySelector("input[type=checkbox]").checked;
    if(checkstate) {
      self.color = colors[6];
    }else{
      self.color = 'black';
    }
    this.cells.forEach(function( cell ) {
      cell.$el.css('background', self.color);
    });
  }
  IShape.prototype = new BaseShape();
  IShape.prototype.constructor = IShape;
  IShape.prototype.setInitialCoordinates = function() {
    var secondRow = this.grid.rowsCount - 2;
    var middleColumn = parseInt(this.grid.colsCount / 2, 10);
    this.coords.push({x: middleColumn-2, y: secondRow+1});
    this.coords.push({x: middleColumn-1, y: secondRow+1});
    this.coords.push({x: middleColumn, y: secondRow+1});
    this.coords.push({x: middleColumn+1, y: secondRow+1});
  };
  IShape.prototype.getRotationData = function() {
    var center;
    var coords = [];
    var newRotationState;
    switch (this.rotationState) {
      case 1:
      center = this.cells[1];

      coords.push({x: center.x+1, y: center.y+1});
      coords.push({x: center.x+1, y: center.y});
      coords.push({x: center.x + 1, y: center.y-1});
      coords.push({x: center.x + 1, y: center.y-2});
      newRotationState = 2;
      break;
      case 2:
      center = this.cells[2];
      coords.push({x: center.x-2, y: center.y+1});
      coords.push({x: center.x-1, y: center.y+1});
      coords.push({x: center.x, y: center.y+1});
      coords.push({x: center.x+1, y: center.y+1});
      newRotationState = 3;
      break;
      case 3:
      center = this.cells[2];
      coords.push({x: center.x, y: center.y+1});
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x, y: center.y-1});
      coords.push({x: center.x, y: center.y-2});
      newRotationState = 4;
      break;
      case 4:
      center = this.cells[1];
      coords.push({x: center.x-2, y: center.y});
      coords.push({x: center.x-1,y: center.y});
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x+1, y: center.y});
      newRotationState = 1;
      break;
    }
    return [coords, newRotationState];
  };

  function FShape( grid, collisionState ) {
    this.onInit(grid,collisionState);
    let self = this;
    let checkstate = $('#blockcolor').parent().parent()[0].querySelector("input[type=checkbox]").checked;
    if(checkstate) {
      self.color = colors[7];
    }else{
      self.color = 'black';
    }
    this.cells.forEach(function( cell ) {
      cell.$el.css('background', self.color);
    });
  }
  FShape.prototype = new BaseShape();
  FShape.prototype.constructor = FShape;
  FShape.prototype.setInitialCoordinates = function() {
    var secondRow = this.grid.rowsCount - 2;
    var middleColumn = parseInt(this.grid.colsCount / 2, 10)-1;
    this.coords.push({x: middleColumn, y: secondRow});
    this.coords.push({x: middleColumn, y: secondRow + 1});
    this.coords.push({x: middleColumn, y: secondRow - 1});
    this.coords.push({x: middleColumn, y: secondRow - 2});
    this.coords.push({x: middleColumn + 1, y: secondRow - 1});
    this.coords.push({x: middleColumn + 1, y: secondRow + 1});
  };
  FShape.prototype.getRotationData = function() {
    var center;
    var coords = [];
    var newRotationState;
    switch (this.rotationState) {
      case 3:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x - 1, y: center.y});
      coords.push({x: center.x + 1, y: center.y});
      coords.push({x: center.x, y: center.y + 1});
      coords.push({x: center.x - 2, y: center.y});
      coords.push({x: center.x - 2, y: center.y+1});
      newRotationState = 4;
      break;
      case 2:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x, y: center.y + 1});
      coords.push({x: center.x, y: center.y - 1});
      coords.push({x: center.x - 1, y: center.y});
      coords.push({x: center.x, y: center.y - 2});
      coords.push({x: center.x - 1, y: center.y - 2});
      newRotationState = 3;
      break;
      case 1:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x-1, y: center.y});
      coords.push({x: center.x + 1, y: center.y});
      coords.push({x: center.x-1, y: center.y - 1});
      coords.push({x: center.x-2, y: center.y});
      coords.push({x: center.x + 1, y: center.y-1});
      newRotationState = 2;
      break;
      case 4:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x, y: center.y + 1});
      coords.push({x: center.x, y: center.y - 1});
      coords.push({x: center.x + 1, y: center.y - 1});
      coords.push({x: center.x, y: center.y - 2});
      coords.push({x: center.x + 1, y: center.y + 1});
      newRotationState = 1;
      break;
    }
    return [coords, newRotationState];
  };

  // Pack all the shape classes in one object (namespace)
  Shape.Sq = OShape;
  Shape.T = TShape;
  Shape.S = SShape;
  Shape.Z = ZShape;
  Shape.L = LShape;
  Shape.J = JShape;
  Shape.I = IShape;
  Shape.F = FShape;

  // Export the shape namespace to the global scope
  global.Shape = Shape;

}( window ));

},{}],12:[function(require,module,exports){
(function( global ){
  "use strict";

  var colors = [
  'aqua',
  '#f9f816',
  'lawngreen',
  'rgb(252, 34, 109)',
  '#1a33e1',
  'orange',
  'springgreen',
  'gold'
  ];


  var Shape2 = {};

  function BaseShape() {
    // this.getRandomColor();
  }
  BaseShape.prototype.constructor = BaseShape;

  BaseShape.prototype.occupyCell = function( cell ) {
    if (cell.isSolid) {
      this.collisionState.triggerEvent('failedRender', [cell]);
      return false;
    }
    cell.$el.css('background', this.color);
    cell.isCurrentShape = true;
    this.cells.push(cell);
    return this;
  };

  BaseShape.prototype.occupyCells = function() {
    var self = this;
    this.coords.forEach(function( coord ) {
      self.occupyCell(self.grid.getCellAt(coord.x, coord.y));
    });
    return this;
  };

  BaseShape.prototype.freeCells = function() {
    var self = this;
    this.cells.forEach(function( cell ) {
      self.freeCell(cell);
    });
    this.cells = [];
    return this;
  };

  BaseShape.prototype.moveLeft = function() {
    this.makeMove({x: -1, y: 0});
  };

  BaseShape.prototype.moveRight = function() {
    this.makeMove({x: 1, y: 0});
  };

  BaseShape.prototype.moveDown = function() {
    this.makeMove({x: 0, y: -1}, function() {
      this.markAsSolid();
      this.collisionState.triggerEvent('landed');
    });
  };

  BaseShape.prototype.rotate = function() {
    var data = this.getRotationData();
    var coords = data[0];
    var newRotationState = data[1];

    var self = this;
    var canRotate = coords.every(function( coord ) {
      var newCell = self.grid.getCellAt(coord.x, coord.y);
      return !(!newCell || newCell.isSolid);
    });
    if (canRotate) {
      this.clearCoords();
      this.freeCells();
      coords.forEach(function( coord ) {
        self.occupyCell(self.grid.getCellAt(coord.x, coord.y));
      });

      this.rotationState = newRotationState;
    }
  };

  BaseShape.prototype.makeMove = function( move, onObstacle ) {
    var self = this;
    var canMakeMove = this.cells.every(function( cell ) {
      var newCell = self.grid.getCellAt(cell.x + move.x, cell.y + move.y);
      return !(!newCell || newCell.isSolid);
    });
    if (canMakeMove) {
      this.clearCoords();
      this.saveCoords();
      this.freeCells();
      this.coords.forEach(function( coord ) {
        self.occupyCell(self.grid.getCellAt(coord.x + move.x, coord.y + move.y));
      });
      let solidgrids = [];
      let eachrow = this.grid.grid.forEach((item)=>{
        item.forEach((items)=>{
          if (items.isSolid || items.isCurrentShape){
            solidgrids.push({x:items.x,y:items.y});
          }

        });
      });

      this.databaseref.set(solidgrids);
    } else if (onObstacle) {
      onObstacle.call(this);
    }

    // console.log("what is this.grid", this.grid);

  };

  BaseShape.prototype.clearCoords = function() {
    this.coords = [];
  };

  BaseShape.prototype.saveCoords = function() {
    var self = this;
    this.cells.forEach(function( cell ) {
      self.coords.push({x: cell.x, y: cell.y});
    });
  };

  BaseShape.prototype.freeCell = function( cell ) {
    cell.$el.css('background', '#6a7941');
    cell.isCurrentShape = false;
    return this;
  };

  BaseShape.prototype.markAsSolid = function() {
    this.cells.forEach(function( cell ) {
      cell.isSolid = true;
      cell.isCurrentShape = false;
    });
  };

  // BaseShape.prototype.getRandomColor = function() {
  //   let self = this;
  //   this.color = colors[Math.floor(Math.random() * colors.length)];
  //   return this.color;
  // };
  // BaseShape.prototype.getRandomColors = function() {
  //   var letters = '0123456789ABCDEF';
  //   var color = '#';
  //   for (var i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // };

  BaseShape.prototype.onInit = function(grid, collisionState, databaseref ) {
    this.rotationState = 1;
    this.collisionState = collisionState;
    this.grid = grid;
    this.events = [];
    this.coords = [];
    this.cells = [];
    this.setInitialCoordinates();
    this.occupyCells();
    this.databaseref = firebase.database().ref(databaseref);
  };

  function OShape( grid, collisionState, databaseref ) {
    this.onInit(grid,collisionState,databaseref);
    let self = this;
    self.color = colors[0];
    this.cells.forEach(function( cell ) {
      cell.$el.css('background', self.color);
    });

  }
  OShape.prototype = new BaseShape();
  OShape.prototype.constructor = OShape;
  OShape.prototype.setInitialCoordinates = function() {
    var firstRow = this.grid.rowsCount - 1;
    var secondRow = this.grid.rowsCount - 2;
    var middleColumn = parseInt(this.grid.colsCount / 2, 10);
    this.coords.push({x: middleColumn-1, y: firstRow});
    this.coords.push({x: middleColumn-1, y: secondRow});
    this.coords.push({x: middleColumn, y: firstRow});
    this.coords.push({x: middleColumn, y: secondRow});
  };
  OShape.prototype.rotate = function() {
  };

  function TShape( grid, collisionState,databaseref ) {
    this.onInit(grid,collisionState,databaseref);
    let self = this;
    self.color = colors[1];
    this.cells.forEach(function( cell ) {
      cell.$el.css('background', self.color);
    });
  }
  TShape.prototype = new BaseShape();
  TShape.prototype.constructor = TShape;
  TShape.prototype.setInitialCoordinates = function() {
    var firstRow = this.grid.rowsCount - 1;
    var secondRow = this.grid.rowsCount - 2;
    var middleColumn = parseInt(this.grid.colsCount / 2, 10);
    this.coords.push({x: middleColumn, y: secondRow});
    this.coords.push({x: middleColumn, y: firstRow});
    this.coords.push({x: middleColumn - 1, y: secondRow});
    this.coords.push({x: middleColumn + 1, y: secondRow});
  };
  TShape.prototype.getRotationData = function() {
    var center;
    var coords = [];
    var newRotationState;
    switch (this.rotationState) {
      case 1:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x, y: center.y + 1});
      coords.push({x: center.x + 1, y: center.y});
      coords.push({x: center.x, y: center.y - 1});
      newRotationState = 2;
      break;
      case 2:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x - 1, y: center.y});
      coords.push({x: center.x + 1, y: center.y});
      coords.push({x: center.x, y: center.y - 1});
      newRotationState = 3;
      break;
      case 3:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x - 1, y: center.y});
      coords.push({x: center.x, y: center.y + 1});
      coords.push({x: center.x, y: center.y - 1});
      newRotationState = 4;
      break;
      case 4:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x - 1, y: center.y});
      coords.push({x: center.x, y: center.y + 1});
      coords.push({x: center.x + 1, y: center.y});
      newRotationState = 1;
      break;
    }
    return [coords, newRotationState];
  };

  function SShape( grid, collisionState,databaseref ) {
    this.onInit(grid,collisionState,databaseref);
    let self = this;
    self.color = colors[2];
    this.cells.forEach(function( cell ) {
      cell.$el.css('background', self.color);
    });
  }
  SShape.prototype  = new BaseShape();
  SShape.prototype.constructor = SShape;
  SShape.prototype.setInitialCoordinates = function() {
    var secondRow = this.grid.rowsCount - 2;
    var middleColumn = parseInt(this.grid.colsCount / 2, 10);
    this.coords.push({x: middleColumn, y: secondRow});
    this.coords.push({x: middleColumn - 1, y: secondRow});
    this.coords.push({x: middleColumn - 1, y: secondRow + 1});
    this.coords.push({x: middleColumn, y: secondRow - 1});
  };
  SShape.prototype.getRotationData = function() {
    var center;
    var coords = [];
    var newRotationState;
    switch (this.rotationState) {
      case 1:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x, y: center.y + 1});
      coords.push({x: center.x + 1, y: center.y + 1});
      coords.push({x: center.x - 1, y: center.y});
      newRotationState = 2;
      break;
      case 2:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x - 1, y: center.y});
      coords.push({x: center.x - 1, y: center.y + 1});
      coords.push({x: center.x, y: center.y - 1});
      newRotationState = 1;
      break;
      case 3:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x, y: center.y + 1});
      coords.push({x: center.x + 1, y: center.y + 1});
      coords.push({x: center.x - 1, y: center.y});
      newRotationState = 4;
      break;
      case 4:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x - 1, y: center.y});
      coords.push({x: center.x - 1, y: center.y + 1});
      coords.push({x: center.x, y: center.y - 1});
      newRotationState = 1;
      break;
    }
    return [coords, newRotationState];
  };

  function ZShape( grid, collisionState,databaseref ) {
    this.onInit(grid,collisionState,databaseref);
    let self = this;
    self.color = colors[3];
    this.cells.forEach(function( cell ) {
      cell.$el.css('background', self.color);
    });
  }
  ZShape.prototype  = new BaseShape();
  ZShape.prototype.constructor = ZShape;
  ZShape.prototype.setInitialCoordinates = function() {
    var secondRow = this.grid.rowsCount - 2;
    var middleColumn = parseInt(this.grid.colsCount / 2, 10);
    this.coords.push({x: middleColumn, y: secondRow});
    this.coords.push({x: middleColumn - 1, y: secondRow});
    this.coords.push({x: middleColumn - 1, y: secondRow - 1});
    this.coords.push({x: middleColumn, y: secondRow + 1});
  };
  ZShape.prototype.getRotationData = function() {
    var center;
    var coords = [];
    var newRotationState;
    switch (this.rotationState) {
      case 1:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x, y: center.y + 1});
      coords.push({x: center.x + 1, y: center.y});
      coords.push({x: center.x - 1, y: center.y + 1});
      newRotationState = 2;
      break;
      case 2:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x - 1, y: center.y});
      coords.push({x: center.x - 1, y: center.y - 1});
      coords.push({x: center.x, y: center.y + 1});
      newRotationState = 1;
      break;
      case 3:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x, y: center.y + 1});
      coords.push({x: center.x + 1, y: center.y});
      coords.push({x: center.x - 1, y: center.y + 1});
      newRotationState = 4;
      break;
      case 4:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x - 1, y: center.y});
      coords.push({x: center.x - 1, y: center.y - 1});
      coords.push({x: center.x, y: center.y + 1});
      newRotationState = 1;
      break;
    }
    return [coords, newRotationState];
  };

  function LShape( grid, collisionState,databaseref ) {
    this.onInit(grid,collisionState,databaseref);
    let self = this;
    self.color = colors[4];
    this.cells.forEach(function( cell ) {
      cell.$el.css('background', self.color);
    });
  }
  LShape.prototype = new BaseShape();
  LShape.prototype.constructor = LShape;
  LShape.prototype.setInitialCoordinates = function() {
    var secondRow = this.grid.rowsCount - 2;
    var middleColumn = parseInt(this.grid.colsCount / 2, 10)-1;
    this.coords.push({x: middleColumn, y: secondRow});
    this.coords.push({x: middleColumn, y: secondRow + 1});
    this.coords.push({x: middleColumn, y: secondRow - 1});
    this.coords.push({x: middleColumn + 1, y: secondRow - 1});
  };
  LShape.prototype.getRotationData = function() {
    var center;
    var coords = [];
    var newRotationState;
    switch (this.rotationState) {
      case 3:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x - 1, y: center.y});
      coords.push({x: center.x + 1, y: center.y});
      coords.push({x: center.x + 1, y: center.y + 1});
      newRotationState = 4;
      break;
      case 2:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x, y: center.y + 1});
      coords.push({x: center.x, y: center.y - 1});
      coords.push({x: center.x - 1, y: center.y + 1});
      newRotationState = 3;
      break;
      case 1:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x-1, y: center.y});
      coords.push({x: center.x + 1, y: center.y});
      coords.push({x: center.x-1, y: center.y - 1});
      newRotationState = 2;
      break;
      case 4:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x, y: center.y + 1});
      coords.push({x: center.x, y: center.y - 1});
      coords.push({x: center.x + 1, y: center.y - 1});
      newRotationState = 1;
      break;
    }
    return [coords, newRotationState];
  };

  function JShape( grid, collisionState,databaseref ) {
    this.onInit(grid,collisionState,databaseref);
    let self = this;
    self.color = colors[5];
    this.cells.forEach(function( cell ) {
      cell.$el.css('background', self.color);
    });
  }
  JShape.prototype = new BaseShape();
  JShape.prototype.constructor = JShape;
  JShape.prototype.setInitialCoordinates = function() {
    var secondRow = this.grid.rowsCount - 2;
    var middleColumn = parseInt(this.grid.colsCount / 2, 10);
    this.coords.push({x: middleColumn, y: secondRow});
    this.coords.push({x: middleColumn, y: secondRow + 1});
    this.coords.push({x: middleColumn, y: secondRow - 1});
    this.coords.push({x: middleColumn -1, y: secondRow - 1});
  };
  JShape.prototype.getRotationData = function() {
    var center;
    var coords = [];
    var newRotationState;
    switch (this.rotationState) {
      case 1:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x - 1, y: center.y});
      coords.push({x: center.x + 1, y: center.y});
      coords.push({x: center.x - 1, y: center.y + 1});
      newRotationState = 2;
      break;
      case 2:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x, y: center.y + 1});
      coords.push({x: center.x + 1, y: center.y + 1});
      coords.push({x: center.x, y: center.y - 1});
      newRotationState = 3;
      break;
      case 3:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x - 1, y: center.y});
      coords.push({x: center.x + 1, y: center.y});
      coords.push({x: center.x + 1, y: center.y - 1});
      newRotationState = 4;
      break;
      case 4:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x, y: center.y + 1});
      coords.push({x: center.x, y: center.y - 1});
      coords.push({x: center.x - 1, y: center.y - 1});
      newRotationState = 1;
      break;
    }
    return [coords, newRotationState];
  };

  function IShape( grid, collisionState,databaseref) {
    this.onInit(grid,collisionState,databaseref);
    let self = this;
    self.color = colors[6];
    this.cells.forEach(function( cell ) {
      cell.$el.css('background', self.color);
    });
  }
  IShape.prototype = new BaseShape();
  IShape.prototype.constructor = IShape;
  IShape.prototype.setInitialCoordinates = function() {
    var secondRow = this.grid.rowsCount - 2;
    var middleColumn = parseInt(this.grid.colsCount / 2, 10);
    this.coords.push({x: middleColumn-2, y: secondRow+1});
    this.coords.push({x: middleColumn-1, y: secondRow+1});
    this.coords.push({x: middleColumn, y: secondRow+1});
    this.coords.push({x: middleColumn+1, y: secondRow+1});
  };
  IShape.prototype.getRotationData = function() {
    var center;
    var coords = [];
    var newRotationState;
    switch (this.rotationState) {
      case 1:
      center = this.cells[1];

      coords.push({x: center.x+1, y: center.y+1});
      coords.push({x: center.x+1, y: center.y});
      coords.push({x: center.x + 1, y: center.y-1});
      coords.push({x: center.x + 1, y: center.y-2});
      newRotationState = 2;
      break;
      case 2:
      center = this.cells[2];
      coords.push({x: center.x-2, y: center.y+1});
      coords.push({x: center.x-1, y: center.y+1});
      coords.push({x: center.x, y: center.y+1});
      coords.push({x: center.x+1, y: center.y+1});
      newRotationState = 3;
      break;
      case 3:
      center = this.cells[2];
      coords.push({x: center.x, y: center.y+1});
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x, y: center.y-1});
      coords.push({x: center.x, y: center.y-2});
      newRotationState = 4;
      break;
      case 4:
      center = this.cells[1];
      coords.push({x: center.x-2, y: center.y});
      coords.push({x: center.x-1,y: center.y});
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x+1, y: center.y});
      newRotationState = 1;
      break;
    }
    return [coords, newRotationState];
  };

  function FShape( grid, collisionState,databaseref ) {
    this.onInit(grid,collisionState,databaseref);
    let self = this;
    self.color = colors[7];
    this.cells.forEach(function( cell ) {
      cell.$el.css('background', self.color);
    });
  }
  FShape.prototype = new BaseShape();
  FShape.prototype.constructor = FShape;
  FShape.prototype.setInitialCoordinates = function() {
    var secondRow = this.grid.rowsCount - 2;
    var middleColumn = parseInt(this.grid.colsCount / 2, 10)-1;
    this.coords.push({x: middleColumn, y: secondRow});
    this.coords.push({x: middleColumn, y: secondRow + 1});
    this.coords.push({x: middleColumn, y: secondRow - 1});
    this.coords.push({x: middleColumn, y: secondRow - 2});
    this.coords.push({x: middleColumn + 1, y: secondRow - 1});
    this.coords.push({x: middleColumn + 1, y: secondRow + 1});
  };
  FShape.prototype.getRotationData = function() {
    var center;
    var coords = [];
    var newRotationState;
    switch (this.rotationState) {
      case 3:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x - 1, y: center.y});
      coords.push({x: center.x + 1, y: center.y});
      coords.push({x: center.x, y: center.y + 1});
      coords.push({x: center.x - 2, y: center.y});
      coords.push({x: center.x - 2, y: center.y+1});
      newRotationState = 4;
      break;
      case 2:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x, y: center.y + 1});
      coords.push({x: center.x, y: center.y - 1});
      coords.push({x: center.x - 1, y: center.y});
      coords.push({x: center.x, y: center.y - 2});
      coords.push({x: center.x - 1, y: center.y - 2});
      newRotationState = 3;
      break;
      case 1:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x-1, y: center.y});
      coords.push({x: center.x + 1, y: center.y});
      coords.push({x: center.x-1, y: center.y - 1});
      coords.push({x: center.x-2, y: center.y});
      coords.push({x: center.x + 1, y: center.y-1});
      newRotationState = 2;
      break;
      case 4:
      center = this.cells[0];
      coords.push({x: center.x, y: center.y});
      coords.push({x: center.x, y: center.y + 1});
      coords.push({x: center.x, y: center.y - 1});
      coords.push({x: center.x + 1, y: center.y - 1});
      coords.push({x: center.x, y: center.y - 2});
      coords.push({x: center.x + 1, y: center.y + 1});
      newRotationState = 1;
      break;
    }
    return [coords, newRotationState];
  };

  // Pack all the shape classes in one object (namespace)
  Shape2.Sq = OShape;
  Shape2.T = TShape;
  Shape2.S = SShape;
  Shape2.Z = ZShape;
  Shape2.L = LShape;
  Shape2.J = JShape;
  Shape2.I = IShape;
  Shape2.F = FShape;
  // Export the shape namespace to the global scope
  global.Shape2 = Shape2;

}( window ));

},{}],13:[function(require,module,exports){
"use strict";
require('./shapes');
require('./grid');

(function( global, Grid, Shape) {
  // let pauseGame = require('./canvas.js');
  var speed = 1065;
  var rowscleared = [];
  var score = 0;
  var time;
  var themesong = document.getElementById("myAudio");
  var tetris = document.getElementById("tetris");
  var move = document.getElementById("move");
  var drop = document.getElementById("drop");
  var rotate = document.getElementById("rotate");
  var gameover = document.getElementById("gameover");
  document.querySelectorAll("audio").forEach((item)=>{item.muted = false;});

  function CollisionState() {
    this.events = [];
  }
  CollisionState.prototype = {
    triggerEvent: function( eventName, args ) {
      for (var i = 0; i < this.events.length; i += 1) {
        if (this.events[i].eventName === eventName) {
          this.events[i].cb.apply(this, args);
        }
      }
    },
    on: function( eventName, cb ) {
      this.events.push({ eventName: eventName, cb: cb });
    }
  };
  var Tetris = function( options, $rootScope, firebaseInfo ) {
    this.difficulty = options.difficulty;
    this.rows = options.rows;
    this.cols = options.cols;
    this.gamePlaceholder = options.gamePlaceholder;
    this.previewPlaceholder = options.previewPlaceholder;
    this.shapes = [Shape.Sq,Shape.T,Shape.S,Shape.Z,Shape.L,Shape.J,Shape.I,Shape.F];
    this.next = this.getRandomShape();
    this.collisionState = new CollisionState();
    this.startGame = false;
    this.time = 0;
    this.level = 0;
    this.render();
    this.initializeCollisionEvents();
  };
  Tetris.prototype = {
    render: function() {
      this.grid = new Grid({
        difficulty: this.difficulty,
        rows: this.rows,
        cols: this.cols,
        render: {
          boardplaceholder: this.gamePlaceholder
        }
      });
      this.preview = new Grid({
       rows: 4,
       cols: 4,
       render: {
         boardplaceholder: this.previewPlaceholder
       }
     });


      return this;
    },

    createNewShape: function() {
      var self = this;
      this.shape = this.getNextShape();
      this.interval = setInterval(()=>{


       self.shape.moveDown();
     },speed);

      // this.opponent.getCellAt(0,1).$el.css('background','red');
    },

    getNextShape: function() {
      var NextShape = this.next;
      this.next = this.getRandomShape();
      this.displayInPreview(this.next);
      return new NextShape(this.grid, this.collisionState);
    },

    getRandomShape: function() {
      let checkstate = $('#difficulty').parent().parent()[0].querySelector("input[type=checkbox]").checked;


      if(checkstate) {
        return this.shapes[Math.floor(Math.random() * 7)];

      }else{
        return this.shapes[Math.floor(Math.random() * this.shapes.length)];
      }


    },

    displayInPreview: function( ShapePreview ) {
      this.preview.cells.forEach(function( cell ) {
        cell.$el.css('background', '#6a7941');
      });
      this.shapePreview = new ShapePreview(this.preview);
    },

    clearInterval: function() {
      clearInterval(this.interval);
    },
    pause: function() {
      var self = this;
      if (this.paused) {
        this.interval = setInterval(function() {
          self.shape.moveDown();
        },speed);
        this.paused = false;
        this.timer();
        themesong.play();
        $('#pauser').removeClass('blinks');
      } else {
        this.clearInterval();
        this.paused = true;
        clearTimeout(self.time);
        themesong.pause();
        $('#pauser').addClass('blinks');


      }
    },
    initializeCollisionEvents: function() {
      var self = this;
      this.collisionState.on('landed', function() {
        self.clearInterval();
        if (!self.gameOver) {
          self.collapseSolidRows();
          self.createNewShape();
        }
      });
      this.collisionState.on('failedRender', function() {
        self.endGame();
      });
    },

    collapseSolidRows: function() {
      var rowsWereCollapsed = false;
      var self = this;
      this.grid.rows.forEach(function( row ) {
        if (self.isSolidRow(row)) {
          rowsWereCollapsed = true;
          self.collapseRow(row);
          score++;
          $('#score').html(score*1000);
          tetris.play();
        }
      });
      if (rowsWereCollapsed) {
        this.moveDownRowsWithSolidCells();
        this.collisionState.triggerEvent('rowsCollapsed');

      }
    },

    isSolidRow: function( row ) {
      return row.every(function( cell ){
        return cell.isSolid;
      });
    },

    collapseRow: function( row ) {
      row.forEach(function( cell ) {
        cell.isSolid = false;
        cell.$el.css('background', '#6a7941');
      });
    },

    moveDownRowsWithSolidCells: function() {
      var self = this;
      var currentRowIndex = -1;
      // iterate all rows by starting from the lowest one
      this.grid.rows.forEach(function( row ) {
        currentRowIndex += 1;

        // if the row is empty, we skip it, there's no need to move down an empty row
        if (self.isEmptyRow(row)) {
          return;
        }

        // we want to get the lowest empty row, because several rows may have been collapsed, in this case
        // the next row with solid cells will need to travel all the way down to occupy the lowest empty row
        var lowestEmptyRowIndex = self.getLowestEmptyRowIndex();
        // if the current row doesn't have empty rows beneath it, it doesn't need to go down any further, so
        // we skip it
        if (lowestEmptyRowIndex > currentRowIndex) {
          return;
        }
        self.moveRowDown(row, lowestEmptyRowIndex);
      });
    },

    isEmptyRow: function( row ) {
      return row.every(function( cell ) {
        return !cell.isSolid;
      });
    },

    getLowestEmptyRowIndex: function() {
      var self = this;
      var index = -1;
      this.grid.rows.every(function( row ) {
        index += 1;
        return !self.isEmptyRow(row);
      });
      return index;
    },
    moveRowDown: function( row, lowestEmptyRowIndex ) {
      var self = this;

      row.forEach(function( cell ) {
        var coords = {x: cell.x, y: cell.y};

        var newCell = self.grid.getCellAt(coords.x, lowestEmptyRowIndex);
        if (newCell) {
          var wasSolid = cell.isSolid;
          var previousBackgroundColor = cell.$el.css('background');
          cell.$el.css('background', '#6a7941');
          cell.isCurrentShape = false;
          cell.isSolid = false;
          if (wasSolid) {
            newCell.$el.css('background', previousBackgroundColor);
            newCell.isSolid = true;
          } else {
            newCell.$el.css('background', '#6a7941');
            newCell.isSolid = false;
          }
        }
      });


    },
    timer: function() {
      if (speed >= 165 && !this.paused) {
        this.time = setTimeout(()=>{


          if(!this.paused) {
            speed=speed-100;
            this.level++;
            $('#level').html(this.level);
            this.timer();
          }
        },60000);
      }
    },
    bind: function() {
      var self = this;

      ////////////////////////KEYBOARD EVENTS/////////////////////////////
      $(document).on('keydown', function( e ) {
        switch (e.keyCode) {
          case 32: // Space move all the way down
          $('#control-b').attr("style",'box-shadow: 0 0 5px 5px #333;');
          setTimeout(()=>{
            $('#control-b').attr("style",'');
          },200);
          self.clearInterval();
          if (!self.paused) {
           drop.play();
           self.interval = setInterval(function() {
             self.shape.moveDown();
           }, 1);
         }
         break;
          case 37: // Left arrow
          $('.left').attr("style",'box-shadow: 0 0 5px 5px #333;');
          setTimeout(()=>{
            $('.left').attr("style",'');
          },200);
          if (!self.paused) {
            move.play();
            self.shape.moveLeft();
          }
          break;
          case 90: // Z key rotate counterclockwise
          $('.up').attr("style",'box-shadow: 0 0 5px 5px #333;');
          setTimeout(()=>{
            $('.up').attr("style",'');
          },200);
          if (self.shape.rotationState == 1) {
            self.shape.rotationState =3;
          }
          else if (self.shape.rotationState== 2) {
            self.shape.rotationState =4;
          }
          else {
            self.shape.rotationState= self.shape.rotationState-2;
          }
          if (!self.paused) {
            rotate.play();
            self.shape.rotate();
          }
          break;
          case 88: // X key rotate clockwise
          $('#control-a').attr("style",'box-shadow: 0 0 5px 5px #333;');
          setTimeout(()=>{
            $('#control-a').attr("style",'');
          },200);
          if (!self.paused) {
            rotate.play();
            self.shape.rotate();
          }
          break;
          case 38: // Up arrow rotate right
          $('#control-a').attr("style",'box-shadow: 0 0 5px 5px #333;');
          setTimeout(()=>{
            $('#control-a').attr("style",'');
          },200);
          if (!self.paused) {
            rotate.play();
            self.shape.rotate();
          }
          break;

          case 39: // Right arrow
          $('.right').attr("style",'box-shadow: 0 0 5px 5px #333;');
          setTimeout(()=>{
            $('.right').attr("style",'');
          },200);
          if (!self.paused) {
            move.play();
            self.shape.moveRight();
          }
          break;
          case 40: // Down arrow
          $('.down').attr("style",'box-shadow: 0 0 5px 5px #333;');
          setTimeout(()=>{
            $('.down').attr("style",'');
          },200);
          if (!self.paused) {
            move.play();
            self.shape.moveDown();
          }
          break;
          case 80: // 'P'
          self.pause();
          break;

          default:
          // ..
        }
      });

      ////////////////////////CLICK EVENTS/////////////////////////////

      $(document).on('click', function( e ) {
        // $(e.target).data.id is the id of the DOM element that is clicked
        let domId = $(e.target).data('id');
        if (self.startGame) {
          switch (domId) {
            case "control-b": // Space bar move all the way down
            self.clearInterval();

            if (!self.paused) {
              drop.play();
              self.interval = setInterval(function() {
                self.shape.moveDown();
              }, 1);
            }
            break;
            case "d-left":
            if (!self.paused) {
              move.play();
              self.shape.moveLeft();
            }
            break;
            case "d-right":
            if (!self.paused) {
              move.play();
              self.shape.moveRight();
            }
            break;
            case "d-down":
            if (!self.paused) {
              move.play();
              self.shape.moveDown();
            }
            break;
            case "control-a":
            if (!self.paused) {
              rotate.play();
              self.shape.rotate();
            }
            break;
            case "d-up":
            if (!self.paused) {
              rotate.play();
              self.shape.rotate();
            }
            break;
            case "pauser":
            self.pause();
            break;
          }
        }
      });


    },
    endGame: function () {
      this.clearInterval();
      if (score !== 0) {
        Materialize.toast('Game Over<br> Your score was...'+' '+Number(score)*1000, 4000);
        gameover.play();
      }
      this.gameOver = true;
      this.shape = false;
      this.startGame = false;
      speed = 1065;
      this.paused = false;
      this.level=0;
      clearTimeout(this.time);
      themesong.pause();
      $(this).off('keydown');
      $(this).off("keyup");
      score = score*1000;
      if(score>$('#highScore').html()){
        let newhighscorename = prompt("Congratulations! Enter your name...");
        if (newhighscorename === '') {
          newhighscorename = 'guest';
        }else if (newhighscorename === null) {
          newhighscorename = 'guest';
        }
        $.ajax({
          url: `https://tetris-arena.firebaseio.com/highscores.json`,
          method: "POST",
          data : JSON.stringify({name:newhighscorename,score:score})
        })
        .done(function(response) {

        });
      }


      // $(document).off('click');
      if (score > localStorage.score) {

        localStorage.score = score;
      }
      score = 0;
    },

    init: function() {

      this.bind();
      this.createNewShape();
      this.startGame = true;
      this.paused = false;
      $('#startGame').off("click");
      $('#startGame').off("keydown");
      $('#startGame').off("keyup");
      this.timer();
      themesong.currentTime = 0;
      themesong.play();
    }
  };
  Tetris.$inject = ['$rootScope','firebaseInfo'];
  angular.module('TetrisApp').controller('Tetris', Tetris);
  global.Tetris = Tetris;
}( window , window.Grid,window.Shape));


},{"./grid":8,"./shapes":11}],14:[function(require,module,exports){
"use strict";
require('./shapes');
require('./grid');

(function( global, Grid, Shape2) {
  // let pauseGame = require('./canvas.js');
  var speed = 1065;
  var rowscleared = [];
  var score = 0;
  var fkeyscore = 0;
  var fshape = false;
  var howmanyfshapes = 0;
  var time;
  var themesong = document.getElementById("myAudio");
  var tetris = document.getElementById("tetris");
  var move = document.getElementById("move");
  var drop = document.getElementById("drop");
  var rotate = document.getElementById("rotate");
  var gameover = document.getElementById("gameover");


  function CollisionState() {
    this.events = [];
  }
  CollisionState.prototype = {
    triggerEvent: function( eventName, args ) {
      for (var i = 0; i < this.events.length; i += 1) {
        if (this.events[i].eventName === eventName) {
          this.events[i].cb.apply(this, args);
        }
      }
    },
    on: function( eventName, cb ) {
      this.events.push({ eventName: eventName, cb: cb });
    }
  };


  var Tetris2 = function( options, $rootScope, firebaseInfo ) {
    this.difficulty = options.difficulty;
    this.rows = options.rows;
    this.cols = options.cols;
    this.gamePlaceholder = options.gamePlaceholder;
    this.previewPlaceholder = options.previewPlaceholder;
    this.opponentPlaceholder = options.opponentPlaceholder;
    this.gameBoardRef = options.gameBoardRef;
    this.databaseref = this.FBRef();
    this.shapes = [Shape2.Sq,Shape2.T,Shape2.S,Shape2.Z,Shape2.L,Shape2.J,Shape2.I,Shape2.F];
    this.next = this.getRandomShape();
    this.collisionState = new CollisionState();
    this.startGame = false;
    this.time = 0;
    this.level = 0;
    this.render();
    this.initializeCollisionEvents();
  };
  Tetris2.prototype = {
    render: function() {
      this.grid = new Grid({
        difficulty: this.difficulty,
        rows: this.rows,
        cols: this.cols,
        render: {
          boardplaceholder: this.gamePlaceholder
        }
      });
      this.preview = new Grid({
       rows: 4,
       cols: 4,
       render: {
         boardplaceholder: this.previewPlaceholder
       }
     });
      this.opponent = new Grid({
        difficulty: this.difficulty,
        rows: this.rows,
        cols: this.cols,
        render: {
          boardplaceholder: this.opponentPlaceholder
        }
      });

      return this;
    },

    createNewShape: function() {
      var self = this;
      this.shape = this.getNextShape();
      this.interval = setInterval(()=>{


       self.shape.moveDown();

     },speed);

    },

    getNextShape: function() {
      var NextShape = this.next;
      this.next = this.getRandomShape();
      this.displayInPreview(this.next);
      return new NextShape(this.grid, this.collisionState, this.databaseref);
    },

    getRandomShape: function() {

      if (fshape) {
        if (howmanyfshapes>0) {
          howmanyfshapes --;
          return this.shapes[7];

        }else {
          fshape = false;
          return this.shapes[Math.floor(Math.random() * 7)];
        }
      }else {

        return this.shapes[Math.floor(Math.random() * 7)];
      }
    },

    displayInPreview: function( ShapePreview ) {
      this.preview.cells.forEach(function( cell ) {
        cell.$el.css('background', '#6a7941');
      });
      this.shapePreview = new ShapePreview(this.preview);
    },

    clearInterval: function() {
      clearInterval(this.interval);
    },
    pause: function() {
      var self = this;
      if (this.paused) {
        this.interval = setInterval(function() {
          self.shape.moveDown();
        },speed);
        this.paused = false;
        this.timer();
        themesong.play();
        $('#pauser').removeClass('blinks');
      } else {
        this.clearInterval();
        this.paused = true;
        clearTimeout(self.time);
        themesong.pause();
        $('#pauser').addClass('blinks');
      }
    },
    initializeCollisionEvents: function() {
      var self = this;
      this.collisionState.on('landed', function() {
        self.clearInterval();
        if (!self.gameOver) {
          self.collapseSolidRows();
          self.createNewShape();
        }
      });
      this.collisionState.on('failedRender', function() {
        self.endGame();
      });
    },

    collapseSolidRows: function() {
      var rowsWereCollapsed = false;
      var self = this;
      this.grid.rows.forEach(function( row ) {
        if (self.isSolidRow(row)) {
          rowsWereCollapsed = true;
          self.collapseRow(row);
          score++;
          fkeyscore ++;
          if (fkeyscore >2){
            $('.silplate').css('visibility','visible');
          }
          $('#score').html(score*1000);
          tetris.play();
        }
      });
      if (rowsWereCollapsed) {
        this.moveDownRowsWithSolidCells();
        this.collisionState.triggerEvent('rowsCollapsed');

      }
    },

    isSolidRow: function( row ) {
      return row.every(function( cell ){
        return cell.isSolid;
      });
    },

    collapseRow: function( row ) {
      row.forEach(function( cell ) {
        cell.isSolid = false;
        cell.$el.css('background', '#6a7941');
      });
    },

    moveDownRowsWithSolidCells: function() {
      var self = this;
      var currentRowIndex = -1;
      // iterate all rows by starting from the lowest one
      this.grid.rows.forEach(function( row ) {
        currentRowIndex += 1;

        // if the row is empty, we skip it, there's no need to move down an empty row
        if (self.isEmptyRow(row)) {
          return;
        }

        // we want to get the lowest empty row, because several rows may have been collapsed, in this case
        // the next row with solid cells will need to travel all the way down to occupy the lowest empty row
        var lowestEmptyRowIndex = self.getLowestEmptyRowIndex();
        // if the current row doesn't have empty rows beneath it, it doesn't need to go down any further, so
        // we skip it
        if (lowestEmptyRowIndex > currentRowIndex) {
          return;
        }
        self.moveRowDown(row, lowestEmptyRowIndex);
      });
    },

    isEmptyRow: function( row ) {
      return row.every(function( cell ) {
        return !cell.isSolid;
      });
    },

    getLowestEmptyRowIndex: function() {
      var self = this;
      var index = -1;
      this.grid.rows.every(function( row ) {
        index += 1;
        return !self.isEmptyRow(row);
      });
      return index;
    },
    moveRowDown: function( row, lowestEmptyRowIndex ) {
      var self = this;

      row.forEach(function( cell ) {
        var coords = {x: cell.x, y: cell.y};

        var newCell = self.grid.getCellAt(coords.x, lowestEmptyRowIndex);
        if (newCell) {
          var wasSolid = cell.isSolid;
          var previousBackgroundColor = cell.$el.css('background');
          cell.$el.css('background', '#6a7941');
          cell.isCurrentShape = false;
          cell.isSolid = false;
          if (wasSolid) {
            newCell.$el.css('background', previousBackgroundColor);
            newCell.isSolid = true;
          } else {
            newCell.$el.css('background', '#6a7941');
            newCell.isSolid = false;
          }
        }
      });


    },
    timer: function() {
      if (speed >= 165 && !this.paused) {
        this.time = setTimeout(()=>{


          if(!this.paused) {
            speed=speed-100;
            this.level++;
            $('#level').html(this.level);
            this.timer();
          }
        },60000);
      }
    },
    FBRef: function() {
      let database = firebase.database().ref('games');
      let user = firebase.auth().currentUser.uid;
      let self = this;
      if (this.gameBoardRef.user === user) {
        let response = database.push({user:user,name:this.gameBoardRef.name,password:this.gameBoardRef.password}).getKey();
        let ref = firebase.database().ref(`games/${response}`);

        self.opponentref = firebase.database().ref(`games/${response}`);
        $('#progressbar').show();
        self.opponentref.on("value",(snapshot)=>{
          if(snapshot.val()!==null && (self.startGame === false)) {
            self.startGame = true;
            let timeleft = 5;
            self.downloadTimer = setInterval(function(){
              document.getElementById("progressBar").value = --timeleft;
              if(timeleft <= 0) {
                clearInterval(self.downloadTimer);
                $('#progressbar').hide();
                self.init();
                themesong.currentTime = 0;
                themesong.play();
              }
            },1000);

          }

        });

        this.gametimeout = setTimeout(()=>{
          if(!this.startGame && !this.gameOver) {
            this.endGame();
            $('#progressbar').hide();
            alert("Game Timed Out");
            location.href = '#!/home';
          }
        },60000);

        ref.onDisconnect().remove();
        return `games/${response}/grid`;
      }else {
       let response = this.gameBoardRef.key;
       let ref = firebase.database().ref(`games/${response}`);
       ref.onDisconnect().remove();
       return `games/${response}/grids`;
     }
   },



   bind: function() {
    var self = this;
    let ref;
    if (firebase.auth().currentUser.uid !== this.gameBoardRef.user) {
      ref = this.databaseref.replace("/grids","/grid");

    }else if (this.databaseref) {
      ref = this.databaseref.replace("/grid","/grids");
    }
    let selfref = firebase.database().ref(ref);
    selfref.on("value",(snapshot)=>{
      let eachrow = this.grid.rows.forEach((item)=>{
        item.forEach((items,index)=>{
          self.opponent.getCellAt(items.x,items.y).$el.css('background','white');
        });
      });
      if (snapshot.val()) {
        snapshot.val().forEach((item)=>{
          self.opponent.getCellAt(item.x,item.y).$el.css('background','black');
        });
      }
    });
      ////////////////////////KEYBOARD EVENTS/////////////////////////////
      $(document).on('keydown', function( e ) {
        switch (e.keyCode) {
          case 70: // F KEY
          let ref;
          if (firebase.auth().currentUser.uid !== self.gameBoardRef.user) {
            ref = self.databaseref.replace("/grids","");
            if (fkeyscore > 2) {
              let scoreref = firebase.database().ref(ref);
              scoreref.child("opponentscore").set({score:score});

              $('.silplate').css('visibility','hidden');
              fkeyscore = 0;
            }
          }else if (self.databaseref) {
            ref = self.databaseref.replace("/grid","");
            if (fkeyscore > 2) {
              let scoreref = firebase.database().ref(ref);
              scoreref.child("myscore").set({score:score});

              $('.silplate').css('visibility','hidden');
              fkeyscore = 0;
            }
          }



          break;
          case 32: // Space move all the way down
          $('#control-b').attr("style",'box-shadow: 0 0 5px 5px #333;');
          setTimeout(()=>{
            $('#control-b').attr("style",'');
          },200);
          self.clearInterval();
          if (!self.paused) {
           drop.play();
           self.interval = setInterval(function() {
             self.shape.moveDown();
           }, 1);
         }
         break;
          case 37: // Left arrow
          $('.left').attr("style",'box-shadow: 0 0 5px 5px #333;');
          setTimeout(()=>{
            $('.left').attr("style",'');
          },200);
          if (!self.paused) {
            move.play();
            self.shape.moveLeft();
          }
          break;
          case 90: // Z key rotate counterclockwise
          $('.up').attr("style",'box-shadow: 0 0 5px 5px #333;');
          setTimeout(()=>{
            $('.up').attr("style",'');
          },200);
          if (self.shape.rotationState == 1) {
            self.shape.rotationState =3;
          }
          else if (self.shape.rotationState== 2) {
            self.shape.rotationState =4;
          }
          else {
            self.shape.rotationState= self.shape.rotationState-2;
          }
          if (!self.paused) {
            rotate.play();
            self.shape.rotate();
          }
          break;
          case 88: // X key rotate clockwise
          $('#control-a').attr("style",'box-shadow: 0 0 5px 5px #333;');
          setTimeout(()=>{
            $('#control-a').attr("style",'');
          },200);
          if (!self.paused) {
            rotate.play();
            self.shape.rotate();
          }
          break;
          case 38: // Up arrow rotate right
          $('#control-a').attr("style",'box-shadow: 0 0 5px 5px #333;');
          setTimeout(()=>{
            $('#control-a').attr("style",'');
          },200);
          if (!self.paused) {
            rotate.play();
            self.shape.rotate();
          }
          break;

          case 39: // Right arrow
          $('.right').attr("style",'box-shadow: 0 0 5px 5px #333;');
          setTimeout(()=>{
            $('.right').attr("style",'');
          },200);
          if (!self.paused) {
            move.play();
            self.shape.moveRight();
          }
          break;
          case 40: // Down arrow
          $('.down').attr("style",'box-shadow: 0 0 5px 5px #333;');
          setTimeout(()=>{
            $('.down').attr("style",'');
          },200);
          if (!self.paused) {
            move.play();
            self.shape.moveDown();
          }
          break;
          case 80: // 'P'
          self.pause();
          break;

          default:
          // ..
        }
      });

      ////////////////////////CLICK EVENTS/////////////////////////////
      $('#fkey').on('touchEvent', ()=>{
        let ref;
        if (firebase.auth().currentUser.uid !== self.gameBoardRef.user) {
          ref = self.databaseref.replace("/grids","");
          if (fkeyscore > 2) {
            let scoreref = firebase.database().ref(ref);
            scoreref.child("opponentscore").set({score:score});

            $('.silplate').css('visibility','hidden');
            fkeyscore = 0;
          }
        }else if (self.databaseref) {
          ref = self.databaseref.replace("/grid","");
          if (fkeyscore > 2) {
            let scoreref = firebase.database().ref(ref);
            scoreref.child("myscore").set({score:score});

            $('.silplate').css('visibility','hidden');
            fkeyscore = 0;
          }
        }
      });
      $(document).on('click', function( e ) {
        // $(e.target).data.id is the id of the DOM element that is clicked
        let domId = $(e.target).data('id');
        if (self.startGame) {
          switch (domId) {
            case "fkey": // FKEY
            let ref;
            if (firebase.auth().currentUser.uid !== self.gameBoardRef.user) {
              ref = self.databaseref.replace("/grids","");
              if (fkeyscore > 2) {
                let scoreref = firebase.database().ref(ref);
                scoreref.child("opponentscore").set({score:score});

                $('.silplate').css('visibility','hidden');
                fkeyscore = 0;
              }
            }else if (self.databaseref) {
              ref = self.databaseref.replace("/grid","");
              if (fkeyscore > 2) {
                let scoreref = firebase.database().ref(ref);
                scoreref.child("myscore").set({score:score});

                $('.silplate').css('visibility','hidden');
                fkeyscore = 0;
              }
            }

            break;
            case "control-b": // Space bar move all the way down
            self.clearInterval();

            if (!self.paused) {
              drop.play();
              self.interval = setInterval(function() {
                self.shape.moveDown();
              }, 1);
            }
            break;
            case "d-left":
            if (!self.paused) {
              move.play();
              self.shape.moveLeft();
            }
            break;
            case "d-right":
            if (!self.paused) {
              move.play();
              self.shape.moveRight();
            }
            break;
            case "d-down":
            if (!self.paused) {
              move.play();
              self.shape.moveDown();
            }
            break;
            case "control-a":
            if (!self.paused) {
              rotate.play();
              self.shape.rotate();
            }
            break;
            case "d-up":
            if (!self.paused) {
              rotate.play();
              self.shape.rotate();
            }
            break;
            case "pauser":
            self.pause();
            break;
          }
        }
      });


    },
    endGame: function () {
      if($('#progressbar')){
        $('#progressbar').hide();
      }
      if (this.opponentref){

        this.opponentref.off("value");
      }
      clearInterval(this.downloadTimer);
      document.getElementById("progressBar").value = 5;
      themesong.pause();
      themesong.currentTime = 0;
      this.clearInterval();
      if (score !== 0) {
        Materialize.toast('Game Over<br> Your score was...'+' '+Number(score)*1000, 4000);
        gameover.play();
      }
      this.gametimeout = false;
      this.gameOver = true;
      this.shape = false;
      this.startGame = false;
      speed = 1065;
      this.paused = false;
      this.level=0;
      clearTimeout(this.time);
      $(this).off('keydown');
      $(this).off("keyup");

      howmanyfshapes = 0;
      score = 0;
      fkeyscore = 0;
      fshape = false;

      let ref = this.databaseref;
      if (this.gameBoardRef.user !== firebase.auth().currentUser.uid) {
        firebase.database().ref(ref.replace(/grids/,"")).remove();

      }else {
        firebase.database().ref(ref.replace(/grid/,"")).remove();
      }
    },

    init: function() {

      this.bind();
      this.createNewShape();
      this.startGame = true;
      this.paused = false;
      $('#startGame').off("click");
      $('#startGame').off("keydown");
      $('#startGame').off("keyup");
      this.timer();
      let ref;
      if (firebase.auth().currentUser.uid !== this.gameBoardRef.user) {
        ref = this.databaseref.replace("/grids","/myscore");

      }else if (this.databaseref) {
        ref = this.databaseref.replace("/grid","/opponentscore");
      }
      let selfref = firebase.database().ref(ref);
      selfref.on("value",(snapshot)=>{
        if (snapshot.val()){
          if (snapshot.val().score > 2) {
            fshape = true;
            howmanyfshapes ++;
          }

        }
      });
    }
  };

  global.Tetris2 = Tetris2;
}( window , window.Grid,window.Shape2));


},{"./grid":8,"./shapes":11}]},{},[1,2,3,4,5,6,7,8,9,10,11,12,13,14]);
