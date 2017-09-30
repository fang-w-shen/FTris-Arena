(function() {
  'use strict';
  require('../tetris');
  require('../scoregrid');
  var TetrisCtrl = function($rootScope, $scope, AuthFactory, $location, $route, FirebaseFactory) {
    var themesong = document.getElementById("myAudio");
    document.querySelectorAll("audio").forEach((item)=>{item.muted = false;});
    themesong.currentTime = 0;
    function space(thing, from, to) {
      TweenMax.fromTo(thing, Math.floor(Math.random() * (400 - 2 + 1) + 2) * 0.5 + 0.5, { y: from }, { y: to,
        onComplete: space,
        onCompleteParams: [thing, from, to],
        ease: Linear.easeNone });
    }



    setTimeout(()=>{
      $('.space1').fadeIn();
    },3000);
      //////////////WINDOW INITIALIZATION/////////////
      var yourDeviceWidth = window.matchMedia( "(max-width: 570px)" );
      if (yourDeviceWidth.matches) {
          // window width is at less than 500px
          $('body').css("overflow-y","scroll");
        }
        else {
          $('body').css("overflow-y","hidden");
        }
        var spaceDeviceWidth = window.matchMedia( "(max-width: 1024px)" );
        if (spaceDeviceWidth.matches) {


          var itemsDown = [".light4", ".light5", ".light6", ".light7", ".light8", ".light11", ".light12", ".light13", ".light14", ".light15", ".light16"].forEach(function (e) {
            return space(e, -1080, 1080);
          });
          var itemsUp = [".light1", ".light2", ".light3", ".light9", ".light10", ".light17"].forEach(function (e) {
            return space(e, 1080, -1080);
          });
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
