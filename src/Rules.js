function Rules(totalMoves, totalShoots){
  this.totalMoves = totalMoves
  this.totalShoots = totalShoots
  this.remainingMoves = this.totalMoves
  this.remainingShoots = this.totalMoves
}

Rules.prototype.move = function(){
  return this.remainingMoves -= 1
}
