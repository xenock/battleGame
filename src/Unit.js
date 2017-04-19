function Unit(health, power, defense, position, movement, type){
  this.health = health
  this.power = power
  this.defense = defense
  this.position = position
  this.movement = movement
  this.type = type
}

Unit.prototype.attack = function(){
  return this.power
}

Unit.prototype.receiveDamage = function(damage){
  return this.health -= damage - this.defense
}

Unit.prototype.canMove = function(x, y){
  return (Math.abs(x - this.position.x) + Math.abs(y - this.position.y)<= this.movement)
}

Unit.prototype.move = function(x, y){
  this.position.x = x
  this.position.y = y
  return this.position
}
