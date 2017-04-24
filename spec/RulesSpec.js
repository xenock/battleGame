describe('Rules', function(){
  var rules
  var totalMoves, totalAttacks, remainingMoves, remainingAttacks

  beforeEach(function(){
    totalMoves = Math.floor((Math.random()*10 )+2)
    totalAttacks = Math.floor((Math.random()*10 )+2)
    rules = new Rules(totalMoves, totalAttacks)
  })
  describe('Functions behaviour', function(){
    it('should substract one move to remainingMoves', function(){
      expect(rules.move()).toEqual(rules.totalMoves-1)
    })
    it('should substract one attack to remainingAttack', function(){
      expect(rules.attack()).toEqual(rules.totalAttacks-1)
    })
  })
})
