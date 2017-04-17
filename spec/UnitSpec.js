describe('Unit', function(){
  var unit
  var health, power, defense, position

  beforeEach(function(){
    health = Math.floor((Math.random()*10 )+1)
    power = Math.floor((Math.random()*10 )+1)
    defense = Math.floor((Math.random()*10 )+1)
    position = {x:10, y:10}
    unit = new Unit(health, power, defense, position)
  })

  describe('Functions', function(){
    it('should have an attack function', function(){
      expect(typeof(unit.attack)).toBe('function')
    })
    it('should have a receive damage function', function(){
      expect(typeof(unit.receiveDamage)).toBe('function')
    })
  })

  describe('Functions behaviour', function(){
    describe('attack', function(){
      it('should return power attribute', function(){
        expect(unit.attack()).toEqual(power)
      })
      it('should return actual health', function(){
        var actualHealth = health-(power-defense)
        expect(unit.receiveDamage(power)).toEqual(actualHealth)
      })
    })
  })
})
