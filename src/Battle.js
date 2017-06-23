var teamSize = 4
var board = new Board(10, 10)
var rules = new Rules(2, 2)

var teamOne = new Array(teamSize)
var teamTwo = new Array(teamSize)
for(var i=0; i<teamSize; i++){
  teamOne.push(new Unit(10, 10, 5, {x: 0, y: i+2}, 2, 2,'team_one', 'soldier'+i))
  teamTwo.push(new Unit(10, 10, 5, {x: 9, y: i+2}, 2, 2,'team_two', 'soldier'+i))
}

function paintBoard(board, body){
  board.grid.forEach(function(rowArray, y){
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
  // console.log(actions);
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

function initializeCounters(moves, shoots){
  var actionBoard = $('.actionboard')
  actionBoard.append($('<div>').addClass('moves').html('movimientos restantes: '+(moves)))
  actionBoard.append($('<div>').addClass('shoots').html('disparos restantes: '+(shoots)))
}

function updateCounters(moves, shoots){
  $('.moves').html('movimientos restantes'+(moves))
  $('.shoots').html('disparos restantes'+(shoots))
}

function animateShot(unit, enemy){
  var unitCell = $('.x'+unit.position.x+'y'+unit.position.y)
  var enemyCell = $('.x'+enemy.position.x+'y'+enemy.position.y)
  unitCell.addClass('attack')
  enemyCell.addClass('spin')
  document.getElementById('mix').play()
  setTimeout(t => {
    unitCell.removeClass('attack')
    enemyCell.removeClass('spin')
  }, 500)
}

$(document).ready(function(){
  var body = $('body .board')
  paintBoard(board, body)

  var goodSquad = teamOne.concat(teamTwo).filter(u => {return u.type == rules.turn})
  var enemySquad = teamOne.concat(teamTwo).filter(u => {return u.type != rules.turn})

  teamOne.forEach(unit => {putUnitInMap(unit)})
  teamTwo.forEach(unit => {putUnitInMap(unit)})
  initializeCounters(rules.totalMoves, rules.totalAttacks)

  var cell = $('.cell')
  cell.on('click', function(c){
    var selectedCell = $(this).data()
    rules.addClickedCell(selectedCell)

    if(rules.hasTwoActions()){
      if(rules.validPlayerAction()){
        var unit = goodSquad.find(u => {return u.name == rules.attackingUnitName()})

        if(rules.isValidAttack()){
          var enemy = enemySquad.find(u => {return u.name == rules.attackedUnitName()})
          // console.log('enemigo' + enemy);
          attackEnemy(unit, rules.actions, enemy, enemySquad)
          animateShot(unit, enemy)
          rules.attack()
          updateCounters(rules.remainingMoves, rules.remainingAttacks)
          rules.cleanActions()
        } else if(unit.canMove(rules.actions[1].x, rules.actions[1].y)
                  && rules.secondActionIsNotAUnit()){
          moveUnit(unit, rules.actions)
          rules.move()
          updateCounters(rules.remainingMoves, rules.remainingAttacks)
          rules.cleanActions()
        }
      }
      rules.actions.shift()
      console.log(enemySquad.length)
      if(enemySquad.length==0){
        console.log('todo muertos!')
      }
    }
    if(rules.remainingMoves==0 || rules.remainingAttacks==0){
      rules.changeTurn()
      rules.restartActions()
      updateCounters(rules.remainingMoves, rules.remainingAttacks)
      goodSquad = teamOne.concat(teamTwo).filter(u => {return u.type == rules.turn})
      enemySquad = teamOne.concat(teamTwo).filter(u => {return u.type != rules.turn})
    }
  })
})
