var board
var unit = new Unit(10, 10, 5, {x: 5, y: 5}, 2)

function initialBoard(width, height){
  return Array.apply(null, Array(width)).map(e => Array(height))
}

function paintBoard(board, body){
  board.forEach(function(rowArray, x){
    var row = $('<div>').addClass('row')

    for(var y=0; y<rowArray.length; y++){
      var column = $('<div>').addClass('cell r'+x+'c'+y)
      row.append(column)
    }
    body.append(row)
  })
}

$(document).ready(function(){
  var body = $('body')
  board = initialBoard(10, 20)
  paintBoard(board, body)
  $('.r'+unit.position.x+'c'+unit.position.y).css('background', 'red')

})
