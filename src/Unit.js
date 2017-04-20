function Unit(health, power, defense, position, movement, range, type, name){
  this.health = health
  this.power = power
  this.defense = defense
  this.position = position
  this.movement = movement
  this.range = range
  this.type = type
  this.name = name
}

Unit.prototype.canAttack = function(x, y){
  return (Math.abs(x - this.position.x) + Math.abs(y - this.position.y) <= this.range)
}

Unit.prototype.attack = function(){
  return this.power
}

Unit.prototype.receiveDamage = function(damage){
  return this.health -= damage - this.defense
}

Unit.prototype.isDead = function(){
  return this.health <= 0
}

Unit.prototype.canMove = function(x, y){
  return (Math.abs(x - this.position.x) + Math.abs(y - this.position.y)<= this.movement)
}

Unit.prototype.move = function(x, y){
  this.position.x = x
  this.position.y = y
  return this.position
}
