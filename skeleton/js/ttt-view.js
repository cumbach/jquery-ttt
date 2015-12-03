var View = function (game, $el) {
  this.game = game;
  this.$el = $el;
  this.numSquare = 0;
  this.numRow = 0;
  this.setupBoard();
  this.bindEvents();
};

View.prototype.bindEvents = function () {
  this.$el.on('click', '.square', this.makeMove.bind(this));
};

View.prototype.makeMove = function (e) {
  var thisSquare = e.currentTarget;
  if (this.game.board.isEmptyPos($(thisSquare).data('pos'))) {
    $(thisSquare).text(this.game.currentPlayer);
    this.game.playMove($(thisSquare).data('pos'));
  } else {
    alert("Invalid Move!");
  }
  if (this.game.board.isOver()) {
    alert(this.game.winner() + " wins!");
  }


  // debugger;
};

View.prototype.setupBoard = function () {
  _.times(3, function () {
    var $grid = $("<ul>").addClass("grid").data('id', this.numRow);
    this.$el.append($grid);
    this.numSquare = 0;
      _.times(3, function () {
          var $square = $("<li>")
            .addClass("square")
            .data('pos', [this.numRow, this.numSquare]);
          this.numSquare += 1;
          $grid.append($square);
      }.bind(this));
    this.numRow += 1;
  }.bind(this));
};

module.exports = View;
