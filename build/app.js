(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
angular.module('TetrisApp', ['ngRoute']);


angular.module('TetrisApp').config(function($routeProvider) {
  $routeProvider
    .when("/home", {
      templateUrl: "partials/home.html",
      controller: 'HomeCtrl'
    }).when("/Tetris", {
      templateUrl: "partials/tetris.html",
      controller: 'TetrisCtrl'
    }).when("/register", {
      templateUrl: "partials/register.html",
      controller: 'TetrisCtrl'
    }).when("/login", {
      templateUrl: "partials/login.html",
      controller: 'TetrisCtrl'
    })
    .otherwise("/home");
});

angular.module('TetrisApp').run(function($rootScope, $window, firebaseInfo) {

  firebase.initializeApp(firebaseInfo);
  firebase.auth().signOut();
});

},{}],2:[function(require,module,exports){
"use strict";
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var x = canvas.width/2;
    var y = canvas.height-30;
    var dx = -2;
    var dy = -2;

    var fontBase = 1000,
        fontSize = 70,
        ratio;

    var gamePaused = false;
    var game;
    var gamestatus='';
    var pause;

    function update() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.font = getFont();
    }


    // window.onresize = update;

    function getFont() {
        var ratio = fontSize / fontBase;
        var size = canvas.width * ratio;

        return (size|0) + 'px sans-serif';
    }                    // default size for font


    function drawPause() {
        update();
        // ctx.beginPath();
        ctx.fillStyle = "white";

        ctx.fillText(gamestatus, 100, 100);
        // ctx.closePath();
    }


    function pauseGame(e) {
              if (!gamePaused) {
                gamestatus='||  Paused';
                pause = setInterval(()=>{
                        drawPause();
                    },450);
                gamePaused = true;
                $('#myCanvas').css("z-index",1);
                    game = setInterval(function() {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);

                },900);
              }
              else if (gamePaused) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                gamePaused = false;
                gamestatus='';
                $('#myCanvas').css("z-index",-1);
                game = clearInterval(game);
                pause = clearInterval(pause);
              }

    }



    function moverandomly() {
        x = Math.floor((Math.random() * 10) + 1);
        y = Math.floor((Math.random() * 20) + 1);
        dx = Math.floor((Math.random() * 10) + 1);
        dy = Math.floor((Math.random() * 20) + 1);

    }
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    module.exports = pauseGame;

},{}],3:[function(require,module,exports){
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
      } else if (document.getElementById("howToPlay").checked) {
        document.getElementById("howToPlay").focus();
      }
    });


    document.getElementById("playButton").addEventListener("click",()=>{

      $('body').css("overflow-y","hidden !important");
          $('.overlay').css("transition","all 1.5s").css("transform","scale(5)");
      setTimeout(()=>{

      $window.location.href = "#!/Tetris";
      },1000);
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
              $('body').css("overflow-y","scroll !important");
                  $('.overlay').css("transition","all 1.5s").css("transform","scale(5)");
              setTimeout(()=>{

              $window.location.href = "#!/Tetris";
              },1000);
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
  var TetrisCtrl = function($rootScope, $scope, AuthFactory, $location, $route) {
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
            $(document).off("click");
              // Launch fullscreen for browsers that support it!
              launchFullScreen(document.getElementById("mobileDevice")); // the whole page
              tetris.init();
              $(document).on("keyup",(e)=>{
                if(e.keyCode === 82) {
                 $(document).off("keydown");
                  console.log("trying to restart game");
                  tetris.endGame();
                  // exitFullScreen(document.getElementById("tetrisScreen"));
                  $route.reload();
                }
              });
          });
          $(document).on("keydown",(e)=>{

            switch(e.keyCode) {
              case 13:
                // $(document).off("keydown");
                tetris.init();
                $(document).on("keyup",(e)=>{
                    if(e.keyCode === 82) { //R Restart Key
                      $(document).off("keydown");
                      $(document).off("keyup");
                      tetris.endGame();
                      $route.reload();
                      console.log("trying to restart game");
                    }
                  });
                break;

              }
            });


          $('#menu-select').on("click",()=>{
            tetris.endGame();
            $route.reload();
          });


          $("#endGame").on("click",()=>{

            $location.url("/home");
            $scope.$apply();
          });
      //////////////EVENT LISTENTER TO EXIT TO HOME///////////////////
      $(document).on("keyup",(e)=>{
        switch(e.keyCode) {
          case 27: /// ESC KEY
            tetris.endGame();
            $(document).off("keyup");
            $(document).off("keydown");
            $location.url('/home');
            $('*').css("overflow","hidden !important");
            $scope.$apply();
            break;
        }

      });


      }

        if($location.url()==="/Tetris"){
          $("#pauseGame").css("visibility","hidden");
          initializeGame();
        }





      // $(window).on("click",()=>{
      //   $(".drag-target").css("display",'none');
      //   $("#sidenav-overlay").css("z-index",'-1');
      //   $("#sidenav-overlay").css("display",'none');
      // });

  };

  TetrisCtrl.$inject = ['$rootScope', '$scope', 'AuthFactory','$location','$route'];
  angular.module('TetrisApp').controller('TetrisCtrl', TetrisCtrl);
})();

},{"../scoregrid":9,"../tetris":11}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
(function() {
  'use strict';

  var FirebaseFactory = function($q, $http, $rootScope,firebaseInfo) {
    let lowestHighScore;
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
    setLowestHighScore: function(score){
      lowestHighScore = score;
    },
    getLowestHighScore: function(){
      return lowestHighScore;
    }
  };
};

  FirebaseFactory.$inject = ['$q','$http', '$rootScope','firebaseInfo'];
  angular.module('TetrisApp').factory('FirebaseFactory', FirebaseFactory);
})();

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
angular.module('TetrisApp').constant("firebaseInfo", {
    apiKey: "AIzaSyBNq9eV8vzdFJwUlxCzeAh3wsC5apGsdjY",
    authDomain: "tetris-arena.firebaseapp.com",
    databaseURL: "https://tetris-arena.firebaseio.com",
    projectId: "tetris-arena",
    storageBucket: "",
    messagingSenderId: "735100394750"
});

},{}],9:[function(require,module,exports){
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


},{}],10:[function(require,module,exports){
(function( global ){
  "use strict";

  var colors = [
    'aqua',
    'deepskyblue',
    'lawngreen',
    'hotpink',
    'lightseagreen',
    'orange',
    'grey',
    'springgreen',
    'gold'
  ];

  var Shape = {};

  function BaseShape() {
    this.getRandomColor();
  }
  BaseShape.prototype.constructor = BaseShape;

  BaseShape.prototype.occupyCell = function( cell ) {
    if (cell.isSolid) {
      console.error('failed render');
      this.collisionState.triggerEvent('failedRender', [cell]);
      return false;
    }
    cell.$el.css('background', 'black');
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
    } else if (onObstacle) {
      onObstacle.call(this);
    }
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
    cell.$el.css('background', '#9ead86');
    cell.isCurrentShape = false;
    return this;
  };

  BaseShape.prototype.markAsSolid = function() {
    this.cells.forEach(function( cell ) {
      cell.isSolid = true;
      cell.isCurrentShape = false;
    });
  };

  BaseShape.prototype.getRandomColor = function() {
    this.color = colors[Math.floor(Math.random() * colors.length)];
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
  }
  IShape.prototype = new BaseShape();
  IShape.prototype.constructor = IShape;
  IShape.prototype.setInitialCoordinates = function() {
    var secondRow = this.grid.rowsCount - 2;
    console.log("what is this.secondRow", secondRow);

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
        center = this.cells[1];console.log(center);
        coords.push({x: center.x-2, y: center.y});
        coords.push({x: center.x-1,y: center.y});
        coords.push({x: center.x, y: center.y});
        coords.push({x: center.x+1, y: center.y});
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

  // Export the shape namespace to the global scope
  global.Shape = Shape;

}( window ));

},{}],11:[function(require,module,exports){
"use strict";
require('./shapes');
require('./grid');

(function( global, Grid, Shape) {
  // let pauseGame = require('./canvas.js');
  var speed = 1065;
  var rowscleared = [];
  var score = 0;
  var time;
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
  var Tetris = function( options ) {
    this.difficulty = options.difficulty;

    this.rows = options.rows;
    this.cols = options.cols;
    this.gamePlaceholder = options.gamePlaceholder;
    this.previewPlaceholder = options.previewPlaceholder;
    this.shapes = [Shape.Sq,Shape.T,Shape.S,Shape.Z,Shape.L,Shape.J,Shape.I];
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
         rows: 3,
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
    },

    getNextShape: function() {
      var NextShape = this.next;
      this.next = this.getRandomShape();
      this.displayInPreview(this.next);
      return new NextShape(this.grid, this.collisionState);
    },

    getRandomShape: function() {
      return this.shapes[Math.floor(Math.random() * this.shapes.length)];
    },

    displayInPreview: function( ShapePreview ) {
      this.preview.cells.forEach(function( cell ) {
        cell.$el.css('background', '#9ead86');
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
        console.log("game:unthis.paused");
        $("#pauseGame").css('visibility',"hidden");
      } else {
        this.clearInterval();
        this.paused = true;
        clearTimeout(self.time);
        console.log("game:this.paused");
        $("#pauseGame").css('visibility',"visible");
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
          $('#score').html(score);
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
        cell.$el.css('background', '#9ead86');
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
              // score += rowscleared[rowscleared.length-1];
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
          cell.$el.css('background', '#9ead86');
          cell.isCurrentShape = false;
          cell.isSolid = false;
          if (wasSolid) {
            newCell.$el.css('background', previousBackgroundColor);
            newCell.isSolid = true;
          } else {
            newCell.$el.css('background', '#9ead86');
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
                console.log("level",this.level);
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
            console.log(self.grid);
            },200);
            self.clearInterval();

             if (!self.paused) {
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
              self.shape.rotate();
            }
            break;
          case 88: // X key rotate clockwise
            $('#control-a').attr("style",'box-shadow: 0 0 5px 5px #333;');
            setTimeout(()=>{
            $('#control-a').attr("style",'');
            },200);
            if (!self.paused) {
              self.shape.rotate();
            }
            break;
          case 38: // Up arrow rotate right
            $('#control-a').attr("style",'box-shadow: 0 0 5px 5px #333;');
            setTimeout(()=>{
            $('#control-a').attr("style",'');
            },200);
            if (!self.paused) {
              self.shape.rotate();
            }
            break;

          case 39: // Right arrow
            $('.right').attr("style",'box-shadow: 0 0 5px 5px #333;');
            setTimeout(()=>{
            $('.right').attr("style",'');
            },200);
            if (!self.paused) {
              self.shape.moveRight();
            }
            break;
          case 40: // Down arrow
            $('.down').attr("style",'box-shadow: 0 0 5px 5px #333;');
            setTimeout(()=>{
            $('.down').attr("style",'');
            },200);
            if (!self.paused) {
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
        console.log("what is e", $(e),e.target,e.currentTarget);
        // $(e.target).data.id is the id of the DOM element that is clicked
        let domId = $(e.target).data('id');
        console.log("what is domId",domId);
        switch (domId) {
          case "control-b": // Space bar move all the way down
            self.clearInterval();

             if (!self.paused) {
               self.interval = setInterval(function() {
                 self.shape.moveDown();
               }, 1);
             }
            break;
          case "d-left":
            if (!self.paused) {
              self.shape.moveLeft();
            }
            break;
          case "d-right":
            if (!self.paused) {
              self.shape.moveRight();
            }
            break;
          case "d-down":
            if (!self.paused) {
              self.shape.moveDown();
            }
            break;
          case "control-a":
            if (!self.paused) {
              self.shape.rotate();
            }
            break;
          case "d-up":
            if (!self.paused) {
              self.shape.rotate();
            }
            break;
           }
         });


    },
    endGame: function () {
      this.clearInterval();
      this.gameOver = true;
      this.shape = false;
      this.startGame = false;

      speed = 1065;
      this.paused = false;
      this.level=0;
      clearTimeout(this.time);
      $(window).off('keydown');
      if(firebase.auth().currentUser){
        console.log("keep track of scores");
      }

      // $(document).off('click');
       Materialize.toast('Game Over<br> your score was...'+' '+score, 4000);
       score = 0;
    },

    init: function() {

      this.bind();
      this.createNewShape();
      this.startGame = true;
      this.paused = false;
      $('#startGame').off("click");
      $('#startGame').off("keydown");
      this.timer();
    }
  };
  Tetris.$inject = ['$rootScope'];
  global.Tetris = Tetris;
}( window , window.Grid,window.Shape));


},{"./grid":7,"./shapes":10}]},{},[1,2,3,4,5,6,7,8,9,10,11]);
