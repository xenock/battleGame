function Unit(health, power, defense, position, movement){
  this.health = health
  this.power = power
  this.defense = defense
  this.position = position
  this.movement = movement
}

Unit.prototype.attack = function(){
  return this.power
}

Unit.prototype.receiveDamage = function(damage){
  return this.health -= damage - this.defense
}

Unit.prototype.canMove = function(x, y){
  return Math.abs(x - this.position.x) + Math.abs(y - this.position.y)
}
