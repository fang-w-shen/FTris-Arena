(function() {
  'use strict';

  var HomeCtrl = function($rootScope, $scope,$window,FirebaseFactory) {
    $('body').css("overflow","hidden");
    $scope.getHighScores = getHighScores;
    $scope.highScorePlayers=[];
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
    $(window).on("click",()=>{
      if (document.getElementById("play")===null) {
        return false;
      }
      if(document.getElementById("play").checked === true) {
        document.getElementById("play").focus();

      } else if (document.getElementById("highScores").checked) {
        document.getElementById("highScores").focus();
      } else if (document.getElementById("howToPlay").checked) {
        document.getElementById("howToPlay").focus();
      }
    });


    document.getElementById("playButton").addEventListener("click",()=>{

      $('body').css("overflow-y","hidden !important");
      $('.overlay').css("transition","all 4s").css("transform","scale(1.2)");
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
    ////////////////HIGH SCORE MODAL///////////////
    function getHighScores() {
      FirebaseFactory.getHighScores().then((score)=>{
        let scores = score;
        let keys = Object.keys(scores);
        let values = Object.values(scores);

        console.log("score", keys,values);
        values.forEach((player)=>{
          console.log(player);
        });
      });
    }
    $scope.getHighScores();


  };

  HomeCtrl.$inject = ['$rootScope', '$scope','$window','FirebaseFactory'];
  angular.module('TetrisApp').controller('HomeCtrl', HomeCtrl);
})();
