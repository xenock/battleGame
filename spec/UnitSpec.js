describe('Unit', function(){
  var unit

  beforeEach(function(){
    unit = new Unit()
  })

  describe('Attributes', function(){
    it('should have a health number property', function(){
      unit = new Unit(50)
      expect(unit.health).not.toBe(undefined)
      unit = new Unit()
      expect(unit.health).toBe(undefined)
    })
  })
  describe('Functions', function(){
    it('should have an attack function', function(){
      expect(typeof(unit.attack)).toBe('function')
    })
    it('should have a receive damage function', function(){
      expect(typeof(unit.receiveDamage)).toBe('function')
    })
  })
  describe('Default attributes values', function(){})
  describe('Functions behaviour', function(){})
})
