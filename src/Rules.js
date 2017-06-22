function Rules(totalMoves, totalAttacks){
  this.totalMoves = totalMoves
  this.totalAttacks = totalAttacks
  this.remainingMoves = this.totalMoves
  this.remainingAttacks = this.totalAttacks
  this.actions = []
  this.turn = 'team_one'
}

Rules.prototype.move = function(){
  this.remainingMoves--
}

Rules.prototype.attack = function(){
  this.remainingAttacks--
}

Rules.prototype.restartActions = function(){
  this.remainingMoves = this.totalMoves
  this.remainingAttacks = this.totalAttacks
}

Rules.prototype.cleanActions = function(){
  this.actions = []
}

Rules.prototype.hasTwoActions = function(){
  return this.actions.length == 2
}

Rules.prototype.addClickedCell = function(clickedCell){
  this.actions.push(clickedCell)
}

Rules.prototype._firstActionIsAttacker = function(){
  return this.actions[0].type == this.turn
}

Rules.prototype._hasSecondAction = function(){
  // console.log(this.actions[1]);
  return this.actions[1] != undefined
}

Rules.prototype.validPlayerAction = function(){
  return this._firstActionIsAttacker() && this._hasSecondAction()
}

Rules.prototype.attackingUnitName = function(){
  return this.actions[0].name
}

Rules.prototype.attackedUnitName = function(){
  return this.actions[1].name
}

Rules.prototype._secondActionIsAnEnemy = function(){
  console.log(`actions type ${this.actions[1].type}`);
  console.log(`actions 1 ${this.actions[1]}`);
  return this.actions[1].type != this.turn
    && this.actions[1].type != undefined
}

Rules.prototype._haveRemainingActions = function(){
  return this.remainingAttacks>0
}

Rules.prototype.isValidAttack = function(){
  return (this._firstActionIsAttacker()
    && this._secondActionIsAnEnemy()
    && this._haveRemainingActions())
}

Rules.prototype.secondActionIsNotAUnit = function(){
  return this.actions[1].type == undefined
}
