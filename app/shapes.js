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
