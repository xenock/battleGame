var board
var unit = new Unit(10, 10, 5, {x: 5, y: 5}, 2, 'soldier')

function initialBoard(width, height){
  return Array.apply(null, Array(width)).map(e => Array(height))
}
function paintBoard(board, body){
  board.forEach(function(rowArray, y){
    var row = $('<div>').addClass('row')
    for(var x=0; x<rowArray.length; x++){
      var column = $('<div>').addClass('cell x'+x+'y'+y).data({x:x, y:y})
      row.append(column)
    }
    body.append(row)
  })
}
function putUnitInMap(unit){
  $('.x'+unit.position.x+'y'+unit.position.y)
    .css('background', 'red')
    .data('type', unit.type)
}

$(document).ready(function(){
  var body = $('body')
  board = initialBoard(10, 10)

  paintBoard(board, body)
  putUnitInMap(unit)
  var actions = []

  var cell = $('.cell')
  cell.on('click', function(c){
    var selectedCell = $(this).data()
    actions.push(selectedCell)
    console.log(selectedCell) //info consola
    if(actions.length == 2){
      if(actions[0].type && actions[1]){
        unit.move(actions[1].x, actions[1].y)
        putUnitInMap(unit)
        actions = []
      }

      actions.shift()
    }
  })

})
