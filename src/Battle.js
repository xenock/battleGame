var board
var unit = new Unit(10, 10, 5, {x: 5, y: 5}, 2, 2,'team_one')
var enemy = new Unit(10, 10, 5, {x: 8, y: 8}, 2, 2,'team_two')

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
    .addClass(unit.type)
    .data('type', unit.type)
}

function removeLastPosition(unit){
  $('.x'+unit.position.x+'y'+unit.position.y).removeClass('team_one team_two').removeData('type')
}

function moveUnit(unit, actions){
  removeLastPosition(unit)
  unit.move(actions[1].x, actions[1].y)
  putUnitInMap(unit)
}

function attackEnemy(unit, actions, enemy){
  if(unit.canAttack(actions[1].x, actions[1].y)){
    enemy.receiveDamage(unit.attack())
    if(enemy.isDead())
      removeLastPosition(enemy)
  }
}

$(document).ready(function(){
  var body = $('body')
  board = initialBoard(10, 10)

  paintBoard(board, body)
  putUnitInMap(unit)
  putUnitInMap(enemy)
  var actions = []

  var cell = $('.cell')
  cell.on('click', function(c){
    var selectedCell = $(this).data()
    actions.push(selectedCell)
    console.log(selectedCell) //info consola
    if(actions.length == 2){
      if(actions[0].type && actions[1]){ //primero es soldado
        if(actions[0].type && actions[1].type){ //ambos soldados
          attackEnemy(unit, actions, enemy)
          actions = []
        } else if(unit.canMove(actions[1].x, actions[1].y)){
          moveUnit(unit, actions)
          actions = []
        }
      }
      actions.shift()
    }
  })
})
