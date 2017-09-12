"use strict";
require('./shapes');
require('./grid');

(function( global, Grid, Shape) {
  let pauseGame = require('./canvas.js');
  var paused = false;
  var speed = 1000;
  var score = 0;
  var rowscleared = [];
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
  function Tetris( options ) {
    this.difficulty = options.difficulty;

    this.rows = options.rows;
    this.cols = options.cols;
    this.gamePlaceholder = options.gamePlaceholder;
    this.previewPlaceholder = options.previewPlaceholder;
    // this.currentShapePlaceholder = options.currentShapePlaceholder;
    this.shapes = [Shape.Sq,Shape.T,Shape.S,Shape.Z,Shape.L,Shape.J,Shape.I];
    this.next = this.getRandomShape();
    this.collisionState = new CollisionState();
    this.dropRate = setInterval(()=>{
                      if(this.startGame) {

                     this.shape.moveDown();
                      }
                    },speed);
    this.startGame = false;

    this.render();
    this.subscribe();
  }
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
      // this.currentshape = new Grid({
      //    rows: 3,
      //    cols: 4,
      //    render: {
      //      boardplaceholder: this.currentShapePlaceholder
      //     }
      //   });

      return this;
    },
    bind: function() {
      var self = this;

      ////////////////////////KEYBOARD EVENTS/////////////////////////////
      $(document).on('keydown', function( e ) {
        switch (e.keyCode) {
          case 32: // Space move all the way down
            $('#spacebar').attr("style",'border-style:inset');
            setTimeout(()=>{
            $('#spacebar').attr("style",'');
            console.log(self.grid);
            },200);
            self.clearInterval(self.dropRate);

             if (!paused) {
               self.interval = setInterval(function() {
                 self.shape.moveDown();
               }, 1);
             }

            // $('#currentshape').html(' ');
            // self.currentshape = new Grid({
            //                          rows: 3,
            //                          cols: 4,
            //                          render: {
            //                            boardplaceholder: self.currentShapePlaceholder
            //                           }
            //                         });
            // self.previewpanel = new self.shape.constructor(self.currentshape);
            break;
          case 37: // Left arrow
            $('#left').attr("style",'border-style:inset');
            setTimeout(()=>{
            $('#left').attr("style",'');
            },200);
            self.shape.moveLeft();
            break;
          case 90: // Z key rotate counterclockwise
            $('#up').attr("style",'border-style:inset');
            setTimeout(()=>{
            $('#up').attr("style",'');
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
            self.shape.rotate();
            break;
          case 88: // X key rotate clockwise
            $('#up').attr("style",'border-style:inset');
            setTimeout(()=>{
            $('#up').attr("style",'');
            },200);
            self.shape.rotate();
            break;
          case 38: // Up arrow rotate right
            $('#up').attr("style",'border-style:inset');
            setTimeout(()=>{
            $('#up').attr("style",'');
            },200);
            self.shape.rotate();
            break;

          case 39: // Right arrow
            $('#right').attr("style",'border-style:inset');
            setTimeout(()=>{
            $('#right').attr("style",'');
            },200);
            self.shape.moveRight();
            break;
          case 40: // Down arrow
            $('#down').attr("style",'border-style:inset');
            setTimeout(()=>{
            $('#down').attr("style",'');
            },200);
            self.shape.moveDown();
            break;
          case 80: // 'P'
            if (!paused) {
              self.dropRate = clearInterval(self.dropRate);
              paused = true;

            }
            else if (paused) {
              self.dropRate = setInterval(()=>{
                       self.shape.moveDown();
              },speed);
              paused = false;
            }
            pauseGame(e);
            break;

          default:
          // ..
        }
      });

      ////////////////////////CLICK EVENTS/////////////////////////////

      $(document).on('click', function( e ) {
        // $(e.target)[0].id is the id of the DOM element that is clicked
        let domId = $(e.target)[0].id;
        switch (domId) {
          case "spacebar": // Space bar move all the way down
            self.clearInterval(self.dropRate);

             if (!paused) {
               self.interval = setInterval(function() {
                 self.shape.moveDown();
               }, 1);
             }
            // $('#currentshape').html(' ');
            // self.currentshape = new Grid({
            //                          rows: 3,
            //                          cols: 4,
            //                          render: {
            //                            boardplaceholder: self.currentShapePlaceholder
            //                           }
            //                         });
            // self.previewpanel = new self.shape.constructor(self.currentshape);
            break;
          case "left":
            self.shape.moveLeft();
            break;
          case "right":
            self.shape.moveRight();
            break;
          case "down":
            self.shape.moveDown();
            break;
          case "up":
            self.shape.rotate();
            break;
           }
         });


    },
    createNewShape: function() {
      var self = this;
      this.shape = this.getNextShape();
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

    subscribe: function() {
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
          console.log("what is the score", score);
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

    endGame: function () {
      this.clearInterval();
      this.gameOver = true;
      this.shape = false;
      $(document).off('keydown');
      $(document).off('click');
      console.log("game:over");
    },

    init: function() {
      this.bind();
      this.createNewShape();
      this.startGame = true;
    }
  };

  global.Tetris = Tetris;
}( window , window.Grid,window.Shape));

