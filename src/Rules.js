function Rules(totalMoves, totalAttacks){
  this.totalMoves = totalMoves
  this.totalAttacks = totalAttacks
  this.remainingMoves = this.totalMoves
  this.remainingAttacks = this.totalAttacks
}

Rules.prototype.move = function(){
  return this.remainingMoves -= 1
}

Rules.prototype.attack = function(){
  return this.remainingAttacks -= 1
}

Rules.prototype.restartActions = function(){
  this.remainingMoves = this.totalMoves
  this.remainingAttacks = this.totalAttacks
}
