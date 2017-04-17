function Unit(health, power, defense, position){
  this.health = health
  this.power = power
  this.defense = defense
  this.position = position
}

Unit.prototype.attack = function(){
  return this.power
}

Unit.prototype.receiveDamage = function(){}
