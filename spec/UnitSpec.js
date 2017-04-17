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
    it('should have a power number attribute', function(){
      unit = new Unit(50, 10)
      expect(unit.power).not.toBe(undefined)
      unit = new Unit(50)
      expect(unit.power).toBe(undefined)
    })
    it('should have a defense number attribute', function(){
      unit = new Unit(50, 10, 5)
      expect(unit.defense).not.toBe(undefined)
      unit = new Unit(50, 10)
      expect(unit.defense).toBe(undefined)
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
