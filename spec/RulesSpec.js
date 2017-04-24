describe('Rules', function(){
  var rules
  var totalMoves, totalShoots, remainingMoves, remainingShoots

  beforeEach(function(){
    totalMoves = Math.floor((Math.random()*10 )+2)
    totalShoots = Math.floor((Math.random()*10 )+2)
    rules = new Rules(totalMoves, totalShoots)
  })
  describe('Functions behaviour', function(){
    it('should substract one move to remainingMoves', function(){
      expect(rules.move()).toEqual(rules.totalMoves-1)
    })
  })
})
