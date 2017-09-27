"use strict";
require('./shapes');
require('./grid');

(function( global, Grid, Shape2) {
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
    this.shapes = [Shape2.Sq,Shape2.T,Shape2.S,Shape2.Z,Shape2.L,Shape2.J,Shape2.I];
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
      return this.shapes[Math.floor(Math.random() * this.shapes.length)];
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
    FBRef: function() {
      let database = firebase.database().ref('games');
      let user = firebase.auth().currentUser.uid;

      if (this.gameBoardRef.user === user) {
        let response = database.push({user:user,name:this.gameBoardRef.name,password:this.gameBoardRef.password}).getKey();
        let ref = firebase.database().ref(`games/${response}`);

        let opponentref = firebase.database().ref(`games/${response}/grids`);
        $('#progressbar').show();
        opponentref.on("value",(snapshot)=>{
          if (!this.startGame && !this.gameOver && snapshot.val()) {
            var timeleft = 5;
            var downloadTimer = setInterval(function(){
              document.getElementById("progressBar").value = --timeleft;
              if(timeleft <= 0) {
                clearInterval(downloadTimer);
                $('#progressbar').hide();
              }

            },1000);
          }
          if (snapshot.val() && (this.startGame === false) && (this.gameOver !== true)) {
            setTimeout(()=>{
              this.init();
              themesong.currentTime = 0;
              themesong.play();
            },5000);


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
      if($('#progressbar')){
        $('#progressbar').hide();
      }
      themesong.pause();
      themesong.currentTime = 0;
      this.clearInterval();
      if (score !== 0) {
        Materialize.toast('Game Over<br> Your score was...'+' '+score, 4000);
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


      score = 0;
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
    }
  };

  global.Tetris2 = Tetris2;
}( window , window.Grid,window.Shape2));

