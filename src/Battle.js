var board
var teamSize = 4
var boardSize = {
  width: 10,
  height: 10
}
var teamOne = new Array(teamSize)
var teamTwo = new Array(teamSize)
for(var i=0; i<teamSize; i++){
  teamOne.push(new Unit(10, 10, 5, {x: 0, y: i+2}, 2, 2,'team_one', 'soldier'+i))
  teamTwo.push(new Unit(10, 10, 5, {x: 9, y: i+2}, 2, 2,'team_two', 'soldier'+i))
}

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
    .data({'type': unit.type, 'name': unit.name})
}

function removeLastPosition(unit){
  $('.x'+unit.position.x+'y'+unit.position.y).removeClass('team_one team_two').removeData('type','name')
}

function moveUnit(unit, actions){
  removeLastPosition(unit)
  unit.move(actions[1].x, actions[1].y)
  putUnitInMap(unit)
}

function attackEnemy(unit, actions, enemy, enemySquad){
  if(unit.canAttack(actions[1].x, actions[1].y)){
    enemy.receiveDamage(unit.attack())
    if(enemy.isDead()){
      removeLastPosition(enemy)
      enemySquad.splice(enemySquad.indexOf(enemy),1)
      console.log(enemySquad)
    }
  }
}

function initializeCounters(body, moves, shoots, remainingActions){
  body.append($('<div>').addClass('remaining').html('acciones restantes: '+(remainingActions)))
  body.append($('<div>').addClass('moves').html('movimientos restantes: '+(moves)))
  body.append($('<div>').addClass('shoots').html('disparos restantes: '+(shoots)))
}

function updateCounters(moves, shoots, remainingActions){
  $('.remaining').html('acciones restantes'+(remainingActions))
  $('.moves').html('movimientos restantes'+(moves))
  $('.shoots').html('disparos restantes'+(shoots))
}

function animateShot(unit, enemy){
  var unitCell = $('.x'+unit.position.x+'y'+unit.position.y)
  var enemyCell = $('.x'+enemy.position.x+'y'+enemy.position.y)
  unitCell.addClass('attack')
  enemyCell.addClass('spin')
  setTimeout(t => {
    unitCell.removeClass('attack')
    enemyCell.removeClass('spin')
  }, 500)
}

$(document).ready(function(){
  var body = $('body>section')
  board = initialBoard(boardSize.width, boardSize.height)
  paintBoard(board, body)

  var actions = []
  var moves = 2, shoots = 2, remainingActions = 2
  var turn = 'team_one'
  var goodSquad = teamOne.concat(teamTwo).filter(u => {return u.type == turn})
  var enemySquad = teamOne.concat(teamTwo).filter(u => {return u.type != turn})

  teamOne.forEach(unit => {putUnitInMap(unit)})
  teamTwo.forEach(unit => {putUnitInMap(unit)})
  initializeCounters(body, moves, shoots, remainingActions)

  var cell = $('.cell')
  cell.on('click', function(c){
    var selectedCell = $(this).data()
    actions.push(selectedCell)
    // console.log(selectedCell)

    if(actions.length == 2){
      if(actions[0].type == turn && actions[1]){
        var unit = goodSquad.find(u => {return u.name == actions[0].name})

        if(actions[0].type == turn
           && actions[1].type != turn
           && actions[1].type != undefined
           && shoots>0){
          var enemy = enemySquad.find(u => {return u.name == actions[1].name})
          attackEnemy(unit, actions, enemy, enemySquad)

          animateShot(unit, enemy)

          shoots -= 1
          remainingActions -= 1
          updateCounters(moves, shoots, remainingActions)
          actions = []
        } else if(unit.canMove(actions[1].x, actions[1].y)
                  && actions[1].type == undefined){
          moveUnit(unit, actions)
          moves -= 1
          remainingActions -= 1
          updateCounters(moves, shoots, remainingActions)
          actions = []
        }
      }
      actions.shift()
      console.log(enemySquad.length)
      if(enemySquad.length==0){
        console.log('todo muertos!')
      }
    }
    if(shoots==0 || moves==0){
      turn = (turn=='team_one')?turn='team_two':turn='team_one'
      shoots = 2
      moves = 2
      remainingActions = 2
      updateCounters(moves, shoots, remainingActions)
      goodSquad = teamOne.concat(teamTwo).filter(u => {return u.type == turn})
      enemySquad = teamOne.concat(teamTwo).filter(u => {return u.type != turn})
    }
  })
})
