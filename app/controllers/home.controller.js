(function() {
  'use strict';

  var HomeCtrl = function($rootScope, $scope,$window,firebaseInfo) {
    $('body').css("overflow","hidden");
    $('.body').css("overflow","hidden");
    //////////////HOME ANIMATION EVENTS///////////////
    document.getElementById("play").focus();
        $('.overlay').css("display","block").css("opacity","0");
        setTimeout(()=>{
            $('.overlay').css("transition","all 4s").css("transform","scale(1.2)");
            $('.overlay').css("opacity","1").css("ease-in","20s");
            setTimeout(()=>{
              $(".progress").css("visibility","hidden");

            },5000);
            $('.overlay').css("overflow","hidden");
        },1000);
    //////////////CLICK EVENTS///////////////
    document.getElementById("playButton").addEventListener("click",()=>{
      $('body').css("overflow-y","scroll");
      $window.location.href = "#!/Tetris";
    });
    document.getElementById("highScoresButton").addEventListener("click",()=>{
        $("#playButton").css("background-color","rgba(255,255,255,0)");
        $("#howToPlayButton").css("background-color","rgba(255,255,255,0)");
        $("#highScoresButton").css("background-color","rgba(255,255,255,0.4)");
    });
    document.getElementById("howToPlay").addEventListener("click",()=>{
        $("#highScoresButton").css("background-color","rgba(255,255,255,0)");
        $("#playButton").css("background-color","rgba(255,255,255,0)");
        $("#howToPlayButton").css("background-color","rgba(255,255,255,0.4)");
    });
    //////////////KEYBOARD EVENTS///////////////
    $(window).on("keyup",(e)=>{
      if (document.getElementById("play")===null) {
        return false;
      }
      if(document.getElementById("play").checked === true) {
        $("#howToPlayButton").css("background-color","rgba(255,255,255,0)");
        $("#highScoresButton").css("background-color","rgba(255,255,255,0)");
        $("#playButton").css("background-color","rgba(255,255,255,0.4)");

      } else if (document.getElementById("highScores").checked) {
        $("#playButton").css("background-color","rgba(255,255,255,0)");
        $("#howToPlayButton").css("background-color","rgba(255,255,255,0)");
        $("#highScoresButton").css("background-color","rgba(255,255,255,0.4)");
      } else if (document.getElementById("howToPlay").checked) {
        $("#highScoresButton").css("background-color","rgba(255,255,255,0)");
        $("#playButton").css("background-color","rgba(255,255,255,0)");
        $("#howToPlayButton").css("background-color","rgba(255,255,255,0.4)");
      }
      switch(e.keyCode) {
        case 13:
          if(document.getElementById("play").checked){
            $('body').css("overflow-y","scroll");
            $window.location.href = "#!/Tetris";
          } else if(document.getElementById("highScores").checked) {
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
    ////////////////END KEYBOARD EVENTS

  };

  HomeCtrl.$inject = ['$rootScope', '$scope','$window'];
  angular.module('TetrisApp').controller('HomeCtrl', HomeCtrl);
})();
