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
